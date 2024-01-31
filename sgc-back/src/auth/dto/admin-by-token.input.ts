import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class AdminByTokenInput {
  @Field()
  token: string;
}
