import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { User } from '../models/user';
import { Subreddit } from '../models/subreddit';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const username = faker.name.firstName(gender);
  const email = `${username}@${faker.random.word()}.${faker.random.word()}`;

  const user = new User();
  user.username = username;
  user.email = email;
  user.subreddits = factory(Subreddit)() as any;

  return user;
});
