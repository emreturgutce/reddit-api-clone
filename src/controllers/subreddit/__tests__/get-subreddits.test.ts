import request from 'supertest';
import { app } from '../../../app';
import { Subreddit } from '../../../models/subreddit';

describe('Get Subreddits Route Handler Test Suite', () => {
  it('Should return 401 for unauthorized user', async () => {
    await request(app)
      .get('/r')
      .set('Cookie', 'notavalidcookie')
      .send()
      .expect(401);
  });

  it('Should return 200 and return proper subreddits', async () => {
    const cookie = (await global.signup())[0];
    const subreddit1 = { name: 'NodeJS', description: 'NodeJS subreddit' };
    const subreddit2 = { name: 'Java', description: 'Java subreddit' };
    const subreddit3 = { name: 'Go', description: 'Go subreddit' };

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send(subreddit1)
      .expect(201);

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send(subreddit2)
      .expect(201);

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send(subreddit3)
      .expect(201);

    await request(app)
      .get(`/r/${subreddit1.name}/join`)
      .set('Cookie', cookie)
      .send()
      .expect(200);

    await request(app)
      .get(`/r/${subreddit2.name}/join`)
      .set('Cookie', cookie)
      .send()
      .expect(200);

    const response = await request(app)
      .get('/r')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(
      response.body.user.subreddits.map((s: Subreddit) => s.name),
    ).toContain(subreddit1.name);
    expect(
      response.body.user.subreddits.map((s: Subreddit) => s.name),
    ).toContain(subreddit2.name);
  });
});
