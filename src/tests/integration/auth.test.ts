import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import { createUser } from '../factory/user-factory';

import app from '@/app';

const api = supertest(app);

describe('Post /signin', () => {
  it('should respond status 422 when is not given body', async () => {
    const response = await api.post('/signup');

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should respond status 422 when body is invalid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await api.post('/signup').send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe('When body is valid', () => {
    const postBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });

    it('should respond status 401 when email doesnt exists', async () => {
      const body = postBody();

      const response = await api.post('/signin').send(body);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when email is wrong', async () => {
      const body = postBody();
      await createUser(body);

      const response = await api.post('/signin').send({ email: faker.internet.email(), password: body.password });
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should responde status 401 when password is wrong', async () => {
      const body = postBody();
      await createUser(body);

      const response = await api.post('/signin').send({
        email: body.email,
        password: faker.internet.password(10),
      });
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when login is ok', () => {
      it('should with status 200 and receive token', async () => {
        const body = postBody();
        await createUser(body);

        const response = await api.post('/signin').send(body);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body.token).toBeDefined();
      });
    });
  });
});