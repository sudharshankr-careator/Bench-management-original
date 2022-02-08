import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Status {
  @Field()
  @PrimaryColumn()
  statuscode: string;

  @Field()
  @Column({ length: 50, nullable: false, unique: true })
  status: string;

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdat: Date;

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedat: Date;

  @Column({ nullable: true, default: 'manager', length: 50 })
  createdby: string;

  @Column({ nullable: true, default: 'manager', length: 50 })
  updatedby: string;

  @Column({ nullable: false, default: true })
  isactive: boolean;
}
