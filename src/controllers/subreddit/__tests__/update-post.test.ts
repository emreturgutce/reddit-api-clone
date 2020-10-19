import request from 'supertest';
import { app } from '../../../app';

describe('Post Route Handler Test Suite', () => {
  it('Should return 401 for unauthorized user', async () => {
    const cookie = await global.signup();
    const subredditName = 'NodeJS';

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send({
        name: subredditName,
        description: `${subredditName} subreddit`,
      })
      .expect(201);

    await request(app)
      .get(`/r/${subredditName}/join`)
      .set('Cookie', cookie)
      .send()
      .expect(200);

    const response = await request(app)
      .post(`/r/${subredditName}`)
      .set('Cookie', cookie)
      .send({
        title: 'NodeJS is awesome',
        body: 'NodeJS is awesome body',
      })
      .expect(201);

    await request(app)
      .put(`/r/${subredditName}/${response.body.post.id}}`)
      .send({
        title: 'New NodeJS Title',
        body: 'New NodeJS Body',
      })
      .expect(401);
  });

  it('Should return 400 for posts from another subreddit', async () => {
    const cookie = await global.signup();
    const subredditName1 = 'NodeJS';
    const subredditName2 = 'Java';

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send({
        name: subredditName1,
        description: `${subredditName1} subreddit`,
      })
      .expect(201);

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send({
        name: subredditName2,
        description: `${subredditName2} subreddit`,
      })
      .expect(201);

    await request(app)
      .get(`/r/${subredditName1}/join`)
      .set('Cookie', cookie)
      .send()
      .expect(200);

    await request(app)
      .get(`/r/${subredditName2}/join`)
      .set('Cookie', cookie)
      .send()
      .expect(200);

    const response = await request(app)
      .post(`/r/${subredditName1}`)
      .set('Cookie', cookie)
      .send({
        title: 'NodeJS is awesome',
        body: 'NodeJS is awesome body',
      })
      .expect(201);

    await request(app)
      .put(`/r/${subredditName2}/${response.body.post.id}}`)
      .set('Cookie', cookie)
      .send({
        title: 'New NodeJS Title',
        body: 'New NodeJS Body',
      })
      .expect(400);
  });

  it('Should return 400 for non-owner users', async () => {
    const cookie = await global.signup();
    const subredditName = 'NodeJS';

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send({
        name: subredditName,
        description: `${subredditName} subreddit`,
      })
      .expect(201);

    await request(app)
      .get(`/r/${subredditName}/join`)
      .set('Cookie', cookie)
      .send()
      .expect(200);

    const response = await request(app)
      .post(`/r/${subredditName}`)
      .set('Cookie', cookie)
      .send({
        title: 'NodeJS is awesome',
        body: 'NodeJS is awesome body',
      })
      .expect(201);

    await request(app)
      .put(`/r/${subredditName}/${response.body.post.id}}`)
      .set('Cookie', await global.signup('test4', 'test4@test.com', 'test2'))
      .send({
        title: 'New NodeJS Title',
        body: 'New NodeJS Body',
      })
      .expect(400);
  });

  it('Should return 200 for success', async () => {
    const cookie = await global.signup();
    const subredditName = 'NodeJS';

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send({
        name: subredditName,
        description: `${subredditName} subreddit`,
      })
      .expect(201);

    await request(app)
      .get(`/r/${subredditName}/join`)
      .set('Cookie', cookie)
      .send()
      .expect(200);

    const response = await request(app)
      .post(`/r/${subredditName}`)
      .set('Cookie', cookie)
      .send({
        title: 'NodeJS is awesome',
        body: 'NodeJS is awesome body',
      })
      .expect(201);
    console.log(response.body);
    await request(app)
      .put(`/r/${subredditName}/${response.body.post.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'New NodeJS Title',
        body: 'New NodeJS Body',
      })
      .expect(200);
  });
});
