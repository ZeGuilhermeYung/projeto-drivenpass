import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import { generateValidToken } from '..//factory/token-factory';
import { createUser } from '..//factory/user-factory';
import { createCredential, createCredentialByData } from '..//factory/credential-factory';
import app, { init } from '@/app';
import { cleanDB } from '../helpers';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDB();
});

const api = supertest(app);

describe('Get /credential', () => {
  describe('Get the credential', () => {
    it('should respond status 401 when token isnt given ', async () => {
      const response = await api.get('/credential');
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token is invalid ', async () => {
      const token = faker.lorem.word();
      const response = await api.get('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when doesnt have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.get('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond 404 when body is empty ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.get('/credential').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
});

describe('when token is valid', () => {
  it('should respond 200 when token is valid ', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createCredential(user);

    const response = await api.get('/credential').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([
      {
        id: expect.any(Number),
        title: expect.any(String),
        url: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
        userId: user.id
      },
    ]),
    );
  });
});
});

describe('Get /credential/:Id', () => {
  describe('Get the credential', () => {
    it('should respond status 401 when token isnt given ', async () => {
      const response = await api.get('/credential/1');
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token is invalid ', async () => {
      const token = faker.lorem.word();
      const response = await api.get('/credential/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when doesnt have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.get('/credential/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond 401 when ID does not belong to the user ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential();

      const response = await api.get(`/credential/${credential.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond 404 when body is empty ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.get(`/credential/1`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
  });

  describe('when token is valid', () => {
    it('should respond 200 when token is valid ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential(user);

      const response = await api.get(`/credential/${credential.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(expect.objectContaining(
        {
          id: credential.id,
          title: expect.any(String),
          url: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
          userId: user.id
        },
      ),
      );
    });
  });
});

describe('Post /credential', () => {
  const createMockCredential = (userId?: number) => ({
    title: faker.lorem.word(),
    url: faker.internet.url(),
    username: faker.internet.userName(),
    password: faker.internet.password(10),
    userId,
  });

  describe('token Invalid ', () => {
    it('should respond status 401 when token is not given', async () => {
      const response = await api.post('/credential').set('Authorization', `Bearer`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token is invalid', async () => {
      const token = faker.lorem.word();
      const response = await api.post('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when doesnt have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.post('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });

  describe('Token is valid', () => {
    it('should respond status 422 when body inst given ', async () => {
      const token = await generateValidToken();
      const body = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await api.post('/credential').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it('should respond status 422 when body isnt present', async () => {
      const token = await generateValidToken();
      const response = await api.post('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond status 409 when is given the same title', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = createMockCredential(user.id);

      await createCredentialByData(body);

      const response = await api.post('/credential').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    describe('Credential is valid', () => {
      it('should respond status 201', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const body = createMockCredential(user.id);

        const response = await api.post('/credential').set('Authorization', `Bearer ${token}`).send(body);
        expect(response.status).toBe(httpStatus.CREATED);
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
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when dont have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.delete('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });

  describe('Token is valid', () => {
    it('should respond status 422 when body is not given ', async () => {
      const token = await generateValidToken();

      const response = await api.delete('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it('should respond status 422 when body is not present', async () => {
      const token = await generateValidToken();
      const response = await api.delete('/credential').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it('should respond 401 when ID does not belong to the user ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential();

      const response = await api.delete('/credential').set('Authorization', `Bearer ${token}`).send({id: credential.id});
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond 404 when body is empty ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.delete('/credential').set('Authorization', `Bearer ${token}`).send({id: 1});

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
  });
  describe('Credential is valid', () => {
    it('should respond 200 when delete is completed ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential(user);

      const response = await api.delete('/credential').set('Authorization', `Bearer ${token}`).send({id: credential.id});
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});