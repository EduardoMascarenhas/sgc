import { Field, ObjectType } from '@nestjs/graphql';
import { Admin } from './admin.model';

@ObjectType()
export class Admins {
  @Field(() => [Admin])
  admins: Admin[] | null;
  @Field()
  count: number;
}
