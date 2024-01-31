import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindClientsPaginatedInput {
  @Field({ nullable: true })
  skip?: number;
  @Field({ nullable: true })
  take?: number;
  @Field({ nullable: true })
  id?: number;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  tel?: string;
}
