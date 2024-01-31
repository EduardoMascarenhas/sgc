import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindClientInput {
  @Field({ nullable: true })
  id?: number;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  tel?: string;
}
