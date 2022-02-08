import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'src/document/entities/document.entity';
import { Note } from 'src/notes/entities/note.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Resource {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fullname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  empid: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  doj: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  primaryphonenumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  secondaryphonenumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  emailid: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  personalemailid: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  designation?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  accname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  accountmanagerid: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'accountmanagerid', referencedColumnName: 'userid' })
  accmanager: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  skills?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  projectreleasedate: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  projectreleasereason: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comments: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  statuscode: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resumeid: number;

  @Field(() => Document, { nullable: true })
  @OneToOne(() => Document, (document) => document.resource, {
    nullable: true,
    eager: true,
  })
  document: Document;

  @Field(() => [Note], { nullable: true })
  @OneToMany(() => Note, (note) => note.resource, {
    nullable: true,
    eager: true,
  })
  notes: Note[];

  @Field()
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

  @Field({ nullable: true })
  @Column({ nullable: true, default: 'ac', length: 50 })
  createdby: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 'ac', length: 50 })
  updatedby: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: true })
  isactive: boolean;
  @Field({ nullable: true })
  @Column({ nullable: false, default: false })
  isam: boolean;
}
