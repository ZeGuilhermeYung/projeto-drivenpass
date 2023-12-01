import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import { generateValidToken } from '..//factory/token-factory';
import { createUser } from '..//factory/user-factory';
import { createCredential } from '..//factory/credential-factory';
import app from '@/app';

const api = supertest(app);

describe('Get /credential', () => {
  describe('Get the credential', () => {
    it('should respond status 401 when token isnt given ', async () => {
      const response = await api.get('/credential').set('Authorization', `Bearer`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token isnt invalid ', async () => {
      const token = faker.lorem.word();
      const response = await api.get('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond status 401 when dont have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.get('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });

  describe('when token is valid', () => {
    it('should respond 200 when token is valid ', async () => {
      const user = await createUser();
      await createCredential(user.id);
      const token = await generateValidToken(user);

      const response = await api.get('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining([
          {
            id: expect.any(Number),
            title: expect.any(String),
            url: expect.any(String),
            username: expect.any(String),
            password: expect.any(String),
            userId: expect.any(Number),
          },
        ]),
      );
    });
  });
});
/*
it(' ', async () => {
  const response = await api.get('/credential').set('Authorization', `Bearer ${''}`);
  expect(response.status).toBe(httpStatus);
});

describe('Post /credential', () => {
  describe('Post the credential', () => {
    it('should ', async () => {
      const response = await api.post('/credential').send();
      expect(response.status).toBe(httpStatus);
    });
  });
});

it('', async () => {
  const response = await api.post('/credential').send();
  expect(response.status).toBe(httpStatus);
});
*/