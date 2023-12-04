import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import app, { init } from '../../app';
import { cleanDB } from '../helpers';
import { createUser, generateValidToken } from '../factory';
import { createNetwork } from '../factory/network-factory';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDB();
});

const api = supertest(app);

describe('Get /network', () => {
  describe('Get the network', () => {
    it('should respond status 401 when token isnt given ', async () => {
      const response = await api.get('/network');
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token is invalid ', async () => {
      const token = faker.lorem.word();
      const response = await api.get('/network').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when doesnt have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.get('/network').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond 404 when body is empty ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.get('/network').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
  });

  describe('when token is valid', () => {
    it('should respond 200 when token is valid ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createNetwork(user);

      const response = await api.get('/network').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          {
            id: expect.any(Number),
            title: expect.any(String),
            network: expect.any(String),
            password: expect.any(String),
            userId: user.id,
          },
        ]),
      );
    });
  });
});

describe('Get /network/:Id', () => {
  describe('Get the network', () => {
    it('should respond status 401 when token isnt given ', async () => {
      const response = await api.get('/network/1');
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token is invalid ', async () => {
      const token = faker.lorem.word();
      const response = await api.get('/network/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when doesnt have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.get('/network/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond 401 when ID does not belong to the user ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const network = await createNetwork();

      const response = await api.get(`/network/${network.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond 404 when body is empty ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.get(`/network/1`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
  });

  describe('when token is valid', () => {
    it('should respond 200 when token is valid ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const network = await createNetwork(user);

      const response = await api.get(`/network/${network.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: network.id,
          title: expect.any(String),
          network: expect.any(String),
          password: expect.any(String),
          userId: user.id,
        }),
      );
    });
  });
});

describe('Post /network', () => {
  const createMocknetwork = (userId?: number) => ({
    title: faker.lorem.word(),
    network: faker.lorem.word(),
    password: faker.internet.password(10),
    userId,
  });

  describe('token Invalid ', () => {
    it('should respond status 401 when token is not given', async () => {
      const response = await api.post('/network').set('Authorization', `Bearer`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token is invalid', async () => {
      const token = faker.lorem.word();
      const response = await api.post('/network').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when doesnt have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.post('/network').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });

  describe('Token is valid', () => {
    it('should respond status 422 when body inst given ', async () => {
      const token = await generateValidToken();
      const body = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await api.post('/network').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it('should respond status 422 when body isnt present', async () => {
      const token = await generateValidToken();
      const response = await api.post('/network').set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });
    describe('network is valid', () => {
      it('should respond status 201', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const body = createMocknetwork(user.id);

        const response = await api.post('/network').set('Authorization', `Bearer ${token}`).send(body);
        expect(response.status).toEqual(httpStatus.CREATED);
      });
    });
  });
});

describe('Delete /network', () => {
  describe('token Invalid ', () => {
    it('should respond status 401 when token isnt given ', async () => {
      const response = await api.delete('/network').set('Authorization', `Bearer`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when token isnt invalid ', async () => {
      const token = faker.lorem.word();
      const response = await api.delete('/network').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond status 401 when dont have session for token', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      const response = await api.delete('/network').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });

  describe('Token is valid', () => {
    it('should respond status 422 when body is not given ', async () => {
      const token = await generateValidToken();

      const response = await api.delete('/network').set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it('should respond status 422 when body is not present', async () => {
      const token = await generateValidToken();
      const response = await api.delete('/network').set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it('should respond 401 when ID does not belong to the user ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const network = await createNetwork();

      const response = await api.delete('/network').set('Authorization', `Bearer ${token}`).send({ id: network.id });
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it('should respond 404 when body is empty ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.delete('/network').set('Authorization', `Bearer ${token}`).send({ id: 1 });

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
  });
  describe('Network is valid', () => {
    it('should respond 200 when delete is completed ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const network = await createNetwork(user);

      const response = await api.delete('/network').set('Authorization', `Bearer ${token}`).send({ id: network.id });
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
