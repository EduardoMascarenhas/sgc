import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class SigninAdminInput {
  @Field()
  email: string;
  @Field()
  password: string;
}
