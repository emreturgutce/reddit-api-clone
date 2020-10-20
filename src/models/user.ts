import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Post } from './post';
import { Subreddit } from './subreddit';
import { UserDetails } from './user-details';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ select: false, nullable: true })
  token?: string;

  @Column({ type: 'bytea', nullable: true })
  avatar?: Buffer;

  @ManyToMany(() => Subreddit, (subreddit) => subreddit.users)
  @JoinTable()
  subreddits?: Subreddit[];

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @OneToOne(() => UserDetails)
  @JoinColumn()
  details?: UserDetails;

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

  async comparePassword(attempt: string) {
    const response = await bcrypt.compare(attempt, this.password);
    return response;
  }

  async generateAuthToken() {
    this.token = jwt.sign({ id: this.id }, process.env.JWT_SECRET!);
    return this.token;
  }

  async deleteAuthToken() {
    this.token = '';
  }
}

export { User };
