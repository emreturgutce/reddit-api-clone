import request from 'supertest';
import { app } from '../../../app';

describe('Leave Subreddit Route Handler Test Suite', () => {
  it('Should return 200 for authorized user', async () => {
    const cookie = await global.signup();
    const name = 'NodeJS';

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send({
        name,
        description: `${name} subreddit`,
      })
      .expect(201);

    await request(app)
      .get(`/r/${name}/join`)
      .set('Cookie', cookie)
      .send()
      .expect(200);
  });

  it('Should return 401 for unauthorized user', async () => {
    await request(app)
      .get('/r/NodeJS/join')
      .set('Cookie', 'notavalidcookie')
      .send()
      .expect(401);
  });

  it('Should not join non-existing subreddits', async () => {
    await request(app)
      .get('/r/join/NotExists')
      .set('Cookie', await global.signup())
      .send()
      .expect(404);
  });
});
