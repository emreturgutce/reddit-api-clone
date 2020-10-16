import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
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

  @ManyToMany(() => User, (user) => user.subreddits)
  users?: User[];

  @OneToMany(() => Post, (post) => post.subreddit)
  posts?: Post[];

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  createdBy!: User;

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
