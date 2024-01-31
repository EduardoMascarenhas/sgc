import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
