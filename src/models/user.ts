import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

  @Column({ select: false })
  password!: string;

  @Column({ select: false, nullable: true })
  token?: string;

  @Column({ type: 'bytea', nullable: true })
  avatar?: string;

  @ManyToMany(() => Subreddit, (subreddit) => subreddit.users)
  @JoinTable()
  subreddits?: Subreddit[];

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<Boolean> {
    return bcrypt.compare(attempt, this.password);
  }

  @BeforeUpdate()
  async generateAuthToken() {
    this.token = jwt.sign({ id: this.id }, process.env.JWT_SECRET!);
    return this.token;
  }

  async deleteAuthToken() {
    this.token = undefined;
  }
}

export { User };
