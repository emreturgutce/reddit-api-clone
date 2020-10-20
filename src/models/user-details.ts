import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class UserDetails {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name?: string;

  @Column()
  age?: string;

  @Column({ unique: true })
  phoneNumber?: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;
}

export { UserDetails };
