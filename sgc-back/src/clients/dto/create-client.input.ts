import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClientInput {
  @Field({ nullable: true })
  id?: number;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  tel?: string;
  @Field({ nullable: true })
  coordX?: number;
  @Field({ nullable: true })
  coordY?: number;
}
