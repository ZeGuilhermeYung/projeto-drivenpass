import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import { createUser } from '../factory/user-factory';

import app from '@/app';

const api = supertest(app);

describe('Post /signin', () => {
  it('Error badrequest when is not give body', async () => {
    const response = await api.post('/signup');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond status 409 when body is invalid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await api.post('/signup').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('When body is valid', () => {
    const postBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });

    it('should respond status 409 when email not exist', async () => {
      const body = postBody();

      const response = await api.post('/signin').send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond status 409 when email its wrong', async () => {
      const body = postBody();
      await createUser(body);

      const response = await api.post('/signin').send({ email: faker.internet.email(), password: body.password });
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should responde status 409 when password is wrong', async () => {
      const body = postBody();
      await createUser(body);

      const response = await api.post('/signin').send({
        email: body.email,
        password: faker.internet.password(10),
      });
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    describe('when login is ok', () => {
      it('should with status 200 and recive token', async () => {
        const body = postBody();
        await createUser(body);

        const response = await api.post('/signin').send(body);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body.token).toBeDefined();
      });
    });
  });
});