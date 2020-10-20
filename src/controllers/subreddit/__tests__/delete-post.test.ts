import request from 'supertest';
import { app } from '../../../app';

describe('Delete Post Route Handler Test Suite', () => {
  it('Should delete a post', async () => {
    const user = (await global.signup())[0];
    const subreddit = {
      name: 'Subreddit1',
      description: 'Subreddit1 description',
    };

    await request(app)
      .post('/r')
      .set('Cookie', user)
      .send(subreddit)
      .expect(201);

    await request(app)
      .get(`/r/${subreddit.name}/join`)
      .set('Cookie', user)
      .send()
      .expect(200);

    const response = await request(app)
      .post(`/r/${subreddit.name}`)
      .set('Cookie', user)
      .send({
        title: 'Post1',
        body: 'Post1 body',
      })
      .expect(201);

    await request(app)
      .delete(`/r/${subreddit.name}/${response.body.post.id}`)
      .set('Cookie', user)
      .send()
      .expect(200);
  });
});
