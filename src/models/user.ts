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
import { Post } from './post';
import { Subreddit } from './subreddit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

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

  @Column({ select: false })
  private token: string | undefined;

  @Column({ type: 'bytea', nullable: true })
  avatar?: string;

  @ManyToMany((type) => Subreddit, (subreddit) => subreddit.users)
  @JoinTable()
  subreddits?: Subreddit[];

  @OneToMany((type) => Post, (post) => post.user)
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
    return await bcrypt.compare(attempt, this.password);
  }

  @BeforeUpdate()
  async generateAuthToken() {
    return (this.token = jwt.sign({ id: this.id }, process.env.JWT_KEY!));
  }

  async verifyAuthToken(attempt: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      jwt.verify(attempt, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) throw new createHttpError.Unauthorized();

        return decoded ? resolve(true) : reject(false);
      });
    });
  }

  async deleteAuthToken() {
    this.token = undefined;
  }
}

export { User };
