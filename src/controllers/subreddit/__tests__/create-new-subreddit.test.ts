import request from 'supertest';
import { app } from '../../../app';

describe('Create New Subreddit Route Handler Test Suite', () => {
  it('Should return 201 for valid inputs', async () => {
    const name = 'NodeJS';
    const description = 'NodeJS subreddit description';

    const response = await request(app)
      .post('/r')
      .set('Cookie', (await global.signup())[0])
      .send({
        name,
        description,
      })
      .expect(201);

    expect(response.body.subreddit.name).toEqual(name);
    expect(response.body.subreddit.description).toEqual(description);
  });

  it('Should return 401 for unauthorized user', async () => {
    await request(app)
      .post('/r')
      .set('Cookie', 'notavalidcookie')
      .send({
        name: 'NodeJS',
        desription: 'NodeJS Subreddit description',
      })
      .expect(401);
  });
});
