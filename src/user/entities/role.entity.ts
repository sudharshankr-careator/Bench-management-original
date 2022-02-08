import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50, unique: true })
  role: string;

  @Field({ nullable: true })
  @Column({ length: 50, nullable: true })
  description?: string;

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

  @Field()
  @Column({ nullable: true, default: 'admin', length: 50 })
  createdby: string;

  @Field()
  @Column({ nullable: true, default: 'admin', length: 50 })
  updatedby: string;

  @Field()
  @Column({ nullable: false, default: true })
  isactive: boolean;
}
