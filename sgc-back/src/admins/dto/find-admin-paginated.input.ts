import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindAdminsPaginatedInput {
  @Field()
  skip: number;
  @Field()
  take: number;
  @Field({ nullable: true })
  id?: number;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  email?: string;
}
