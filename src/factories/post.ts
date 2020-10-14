import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { Post } from '../models/post';
import { Subreddit } from '../models/subreddit';
import { User } from '../models/user';

define(Post, (faker: typeof Faker) => {
  const title = faker.lorem.words(4);
  const body = faker.lorem.text();

  const post = new Post();
  post.title = title;
  post.body = body;
  post.subreddit = factory(Subreddit)() as any;
  post.user = factory(User)() as any;

  return post;
});
