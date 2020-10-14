import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post';
import { Subreddit } from './subreddit';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: 'blob', nullable: true })
  avatar?: string;

  @ManyToMany((type) => Subreddit, (subreddit) => subreddit.users)
  @JoinTable()
  subreddits?: Subreddit[];

  @OneToMany((type) => Post, (post) => post.user)
  posts?: Post[];

  @CreateDateColumn({
    type: 'datetime',
  })
  createdAt!: Date;

  @CreateDateColumn({
    type: 'datetime',
  })
  updatedAt!: Date;
}

export { User };
