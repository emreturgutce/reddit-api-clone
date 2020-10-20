import request from 'supertest';
import { app } from '../../../app';

describe('Subreddit Posts Route Handler Test Suite', () => {
  it('Should only return the posts belong to subreddit', async () => {
    const user1 = (await global.signup('test1', 'test1@test.com', 'test1'))[0];
    const user2 = (await global.signup('test2', 'test2@test.com', 'test2'))[0];
    const subreddit1 = {
      name: 'Subreddit 1',
      description: 'Subreddit 1 description',
    };
    const subreddit2 = {
      name: 'Subreddit 2',
      description: 'Subreddit 2 description',
    };
    const post1 = { title: 'Post 1 Title', body: 'Post 1 Body' };
    const post2 = { title: 'Post 2 Title', body: 'Post 2 Body' };
    const post3 = { title: 'Post 3 Title', body: 'Post 3 Body' };

    await request(app)
      .post('/r')
      .set('Cookie', user1)
      .send(subreddit1)
      .expect(201);

    await request(app)
      .post('/r')
      .set('Cookie', user2)
      .send(subreddit2)
      .expect(201);

    await request(app)
      .get(`/r/${subreddit1.name}/join`)
      .set('Cookie', user1)
      .send()
      .expect(200);

    await request(app)
      .get(`/r/${subreddit2.name}/join`)
      .set('Cookie', user2)
      .send()
      .expect(200);

    await request(app)
      .post(`/r/${subreddit1.name}`)
      .set('Cookie', user1)
      .send(post1)
      .expect(201);

    await request(app)
      .post(`/r/${subreddit1.name}`)
      .set('Cookie', user1)
      .send(post2)
      .expect(201);

    await request(app)
      .post(`/r/${subreddit2.name}`)
      .set('Cookie', user2)
      .send(post3)
      .expect(201);

    const response = await request(app)
      .get(`/r/${subreddit1.name}/posts`)
      .set('Cookie', user2)
      .send()
      .expect(200);

    expect(response.body.posts.map((p: any) => p.title)).toEqual([
      post1.title,
      post2.title,
    ]);
  });

  it('Should return 401', async () => {
    await request(app).get('/r/NodeJS/posts').send().expect(401);
  });
});
