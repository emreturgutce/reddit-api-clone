import {
  Column,
  CreateDateColumn,
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

  @Column({ type: 'bytea', nullable: true })
  image?: string;

  @ManyToMany((type) => User, (user) => user.subreddits)
  users?: User[];

  @OneToMany((type) => Post, (post) => post.subreddit)
  posts?: Post[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;
}

export { Subreddit };
