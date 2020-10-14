import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Post } from '../models/post';

export default class CreatePosts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Post)().createMany(10);
  }
}
