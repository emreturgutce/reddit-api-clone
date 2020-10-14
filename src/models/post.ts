import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subreddit } from './subreddit';
import { User } from './user';

@Entity()
class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  body!: string;

  @ManyToOne((type) => Subreddit, (subreddit) => subreddit.posts)
  @JoinTable()
  subreddit!: Subreddit;

  @ManyToOne((type) => User, (user) => user.posts)
  @JoinTable()
  user!: User;
}

export { Post };
