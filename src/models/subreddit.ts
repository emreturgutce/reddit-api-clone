import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post';
import { User } from './user';

@Entity()
class Subreddit {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: 'blob', nullable: true })
  image?: string;

  @ManyToMany((type) => User, (user) => user.subreddits)
  users?: User[];

  @OneToMany((type) => Post, (post) => post.subreddit)
  posts?: Post[];
}

export { Subreddit };
