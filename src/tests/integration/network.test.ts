import httpStatus from 'http-status';
import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('Network Integration Tests', () => {
  let userToken: string;
  let networkId: number;

  beforeAll(async () => {
    const signInResponse = await request
      .post('/api/auth/signin')
      .send({ email: 'user@example.com', password: 'userpassword' });

    userToken = signInResponse.body.token;
  });

  it('should create a new network', async () => {
    const response = await request
      .post('/api/network')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'Test Network', network: 'TestNetwork', password: 'testpassword' });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body.title).toBe('Test Network');
    networkId = response.body.id;
  });

  it('should get all networks', async () => {
    const response = await request
      .get('/api/network')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('Test Network');
    expect(response.body[0].password).toBe('testpassword');
  });

  it('should get a specific network by id', async () => {
    const response = await request
      .get(`/api/network/${networkId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.title).toBe('Test Network');
    expect(response.body.password).toBe('testpassword');
  });

  it('should not get a network of another user', async () => {
    const anotherUserToken = 'anotherUserToken';

    const response = await request
      .get(`/api/network/${networkId}`)
      .set('Authorization', `Bearer ${anotherUserToken}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should not get a non-existent network', async () => {
    const nonExistentNetworkId = 9999;

    const response = await request
      .get(`/api/network/${nonExistentNetworkId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should delete a network', async () => {
    const response = await request
      .delete(`/api/network/${networkId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(httpStatus.OK);
  });

  it('should not delete a network of another user', async () => {
    const anotherUserToken = 'anotherUserToken';

    const response = await request
      .delete(`/api/network/${networkId}`)
      .set('Authorization', `Bearer ${anotherUserToken}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should not delete a non-existent network', async () => {
    const nonExistentNetworkId = 9999;

    const response = await request
      .delete(`/api/network/${nonExistentNetworkId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
});
