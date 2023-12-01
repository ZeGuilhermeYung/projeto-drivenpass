import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import { createUser } from '../factory/user-factory';
import app from '@/app';

const api = supertest(app);

describe('Post /signup', () => {
  it('Error badrequest when is not give body', async () => {
    const response = await api.post('/signup');

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should respond status 409 when body is invalid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await api.post('/signup').send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe('When body is valid', () => {
    const postBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });

    it('should respond status 409 when email exist', async () => {
      const body = postBody();
      await createUser(body);

      const response = await api.post('/signup').send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond status 201 when body is valid', async () => {
      const body = postBody();

      const response = await api.post('/signup').send(body);
      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});