import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Subreddit } from '../models/subreddit';

export default class CreateSubreddits implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Subreddit)().createMany(10);
  }
}
