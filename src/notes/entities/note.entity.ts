import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Resource } from 'src/resources/entities/resource.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Note {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resourceid: number;
  // @Field()
  // @Column()
  // statuscode: string;

  @Field(() => Resource)
  @ManyToOne(() => Resource)
  @JoinColumn({ name: 'resourceid', referencedColumnName: 'id' })
  resource: Resource;

  @Field(() => User)
  user: User;

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
  @Column({ nullable: true, default: 'rm', length: 50 })
  createdby: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 'rm', length: 50 })
  updatedby: string;
}
