import request from 'supertest';
import { app } from '../../../app';

describe('Post Route Handler Test Suite', () => {
  it('Should return 201 for valid inputs', async () => {
    const cookie = (await global.signup())[0];

    // Subreddit Creation
    const subredditName = 'NodeJS';

    await request(app)
      .post('/r')
      .set('Cookie', cookie)
      .send({
        name: subredditName,
        description: 'NodeJS subreddit',
      })
      .expect(201);

    // Join Subreddit
    await request(app)
      .get(`/r/${subredditName}/join`)
      .set('Cookie', cookie)
      .send()
      .expect(200);

    // Post
    const title = '5 paragraphs of Lorem Ipsum';
    const body = `Fuga cupiditate dolor amet. Mollitia quia voluptatibus voluptas vitae amet non.\
Voluptatum id rerum est voluptatem assumenda voluptatum. Et et quidem est nemo numquam.`;

    const postResponse = await request(app)
      .post(`/r/${subredditName}`)
      .set('Cookie', cookie)
      .send({
        title,
        body,
      })
      .expect(201);

    expect(postResponse.body.post.title).toEqual(title);
    expect(postResponse.body.post.body).toEqual(body);
  });

  it('Should return 401 for unauthorized user', async () => {
    const name = 'NodeJS';

    await request(app)
      .post('/r')
      .set('Cookie', (await global.signup())[0])
      .send({
        name,
        description: `${name} subreddit`,
      })
      .expect(201);

    await request(app)
      .post(`/r/${name}`)
      .set('Cookie', 'notavalidcookie')
      .send({
        title: 'Why you should NodeJS ?',
        desription: 'Because NodeJS is awesome.',
      })
      .expect(401);
  });
});
