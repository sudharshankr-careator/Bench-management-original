import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class UserRole {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ default: true })
  isdefault: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userid?: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  roleid?: number;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({ name: 'userid', referencedColumnName: 'userid' })
  user: User;

  @Field(() => Role)
  role: Role;
}
