import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './userrole.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  userid: string;

  @Field()
  @Column({ nullable: false, unique: true, length: 50 })
  email: string;

  @Field()
  @Column({ nullable: false, length: 100 })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: false, length: 100 })
  passwordhash?: string;

  @Field()
  @Column({ nullable: false, unique: true, length: 15 })
  mobile: string;

  @Field()
  @Column({ nullable: true, default: 'default-profile-image.jpg', length: 250 })
  profilepicture: string;

  @Field()
  @Column({ nullable: true })
  lastlogin: Date;

  @Field()
  @Column({ default: null, length: 500 })
  usertoken: string;

  @Field()
  @Column({ default: true })
  firsttimelogin: boolean;

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdat: Date;

  @Field()
  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedat: Date;

  @Field()
  @Column({ nullable: true, default: 'admin', length: 50 })
  createdby: string;

  @Field()
  @Column({ nullable: true, default: 'admin', length: 50 })
  updatedby: string;

  @Field()
  @Column({ nullable: false, default: true })
  isactive: boolean;

  @Field(() => UserRole)
  @OneToOne(() => UserRole, (user) => user.user)
  userrole: UserRole;
}

@ObjectType()
export class Jwt {
  @Field()
  token: string;

  @Field()
  userid: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  firsttimelogin: boolean;
}
