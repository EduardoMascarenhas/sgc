import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Admin {
  @Field({ nullable: true })
  id: number;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  name: string;
}
