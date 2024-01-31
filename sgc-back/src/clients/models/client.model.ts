import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Client {
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
  @Field({ nullable: true })
  tel: string;
  @Field({ nullable: true })
  coordX: number;
  @Field({ nullable: true })
  coordY: number;
}
