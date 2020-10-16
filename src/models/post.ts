import {
  BaseEntity,
  Column,
  CreateDateColumn,
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

  @ManyToOne(() => Subreddit, (subreddit) => subreddit.posts)
  subreddit!: Subreddit;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;
}

export { Post };
