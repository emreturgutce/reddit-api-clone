import request from 'supertest';
import { getRepository } from 'typeorm';
import { app } from '../../../app';
import { Subreddit } from '../../../models/subreddit';

describe('Update Subreddit Route Handler Test Suite', () => {
  it('Should return 200 and update for authorized user', async () => {
    const cookie = (await global.signup())[0];
    const name = 'NodeJS';
    const description = `${name} subreddit`;

    const response = await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send({
        name,
        description,
      })
      .expect(201);

    const newSubredditDescription = `${name} updated subreddit`;

    await request(app)
      .put(`/r/${name}`)
      .set('Cookie', cookie)
      .send({
        description: newSubredditDescription,
      })
      .expect(200);

    const subreddit = await getRepository(Subreddit).findOneOrFail(
      response.body.subreddit.id,
    );

    expect(subreddit.description).toEqual(description);
  });

  it('Should return 401 for unauthorized user', async () => {
    await request(app)
      .put('/r/NodeJS')
      .set('Cookie', 'notavalidcookie')
      .send()
      .expect(401);
  });
});
