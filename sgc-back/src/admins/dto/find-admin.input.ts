import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindAdminInput {
  @Field({ nullable: true })
  id?: number;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  email?: string;
}
