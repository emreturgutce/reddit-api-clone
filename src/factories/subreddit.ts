import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Subreddit } from '../models/subreddit';

define(Subreddit, (faker: typeof Faker) => {
  const name = faker.random.word();
  const description = faker.lorem.text();

  const subreddit = new Subreddit();
  subreddit.name = name;
  subreddit.description = description;

  return subreddit;
});
