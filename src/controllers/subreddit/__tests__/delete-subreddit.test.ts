import request from 'supertest';
import { app } from '../../../app';

describe('Delete Subreddit Route Handler Test Suite', () => {
  it('Should return 401 for unauthorized user', async () => {
    await request(app)
      .delete('/r/NodeJS')
      .set('Cookie', 'notavalidcookie')
      .send()
      .expect(401);
  });

  it('Should return 404 for non-existing subreddit', async () => {
    await request(app)
      .delete('/r/NotExists')
      .set('Cookie', await global.signup())
      .send()
      .expect(404);
  });

  it('Should return 400 for non-owner', async () => {
    const name = 'NodeJS';

    // Creating a subreddit with one user
    await request(app)
      .post('/r')
      .set('Cookie', await global.signup())
      .send({
        name,
        description: `${name} subreddit`,
      })
      .expect(201);

    // Trying to delete subreddit just created with another user
    await request(app)
      .delete(`/r/${name}`)
      .set('Cookie', await global.signup('test2', 'test2@test.com', 'test2'))
      .send()
      .expect(400);
  });

  it('Should return 200', async () => {
    const name = 'NodeJS';
    const cookie = await global.signup();

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send({
        name,
        description: `${name} subreddit`,
      })
      .expect(201);

    await request(app)
      .delete(`/r/${name}`)
      .set('Cookie', cookie)
      .send()
      .expect(200);
  });
});
