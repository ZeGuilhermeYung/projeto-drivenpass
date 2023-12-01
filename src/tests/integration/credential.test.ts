import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import { generateValidToken } from '..//factory/token-factory';
import { createUser } from '..//factory/user-factory';
import { createCredential, createCredentialByData } from '..//factory/credential-factory';
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

      const response = await api.get('/credential').set('Authorization', `Bearer ${token.token}`);
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

describe('Post /credential', () => {
  const createMockCredential = (userId?: number) => ({
    title: faker.lorem.word(),
    url: faker.internet.url(),
    username: faker.internet.userName(),
    password: faker.internet.password(6),
    userId,
  });

  describe('token Invalid ', () => {
    it('should respond status 401 when token isnt given ', async () => {
      const response = await api.post('/credential').set('Authorization', `Bearer`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token isnt invalid ', async () => {
      const token = faker.lorem.word();
      const response = await api.post('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond status 401 when dont have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.post('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });

  describe('Token is valid', () => {
    it('should respond status 400 when body inst give ', async () => {
      const token = await generateValidToken();
      const body = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await api.post('/credential').set('Authorization', `Bearer ${token.token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond status 400 when body inst presente', async () => {
      const token = await generateValidToken();
      const response = await api.post('/credential').set('Authorization', `Bearer ${token.token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should responde status 409 when is give the same title', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = createMockCredential(user.id);

      await createCredentialByData(body);

      const response = await api.post('/credential').set('Authorization', `Bearer ${token.token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('Credential is valid', () => {
      it('should responde status 200', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const body = await createCredential(token.userId);
        const bodyFinal = {
          title: body.title,
          url: body.url,
          username: body.username,
          password: body.password,
          userId: body.userId,
        };
        const response = await api.post('/credential').set('Authorization', `Bearer ${token.token}`).send(bodyFinal);
        expect(response.status).toBe(httpStatus.OK);
      });
    });
  });
});

describe('Delete /credential', () => {
  describe('token Invalid ', () => {
    it('should respond status 401 when token isnt given ', async () => {
      const response = await api.delete('/credential').set('Authorization', `Bearer`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token isnt invalid ', async () => {
      const token = faker.lorem.word();
      const response = await api.delete('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond status 401 when dont have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.delete('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });

  describe('Token is valid', () => {
    it('should respond status 400 when body inst give ', async () => {
      const token = await generateValidToken();

      const response = await api.delete('/credential').set('Authorization', `Bearer ${token.token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond status 400 when body inst presente', async () => {
      const token = await generateValidToken();
      const response = await api.delete('/credential').set('Authorization', `Bearer ${token.token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should responde status 409 when is give the same title', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createCredential(token.userId);

      const response = await api.delete('/credential').set('Authorization', `Bearer ${token.token}`).send('1');
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
});