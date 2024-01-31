import { Field, ObjectType } from '@nestjs/graphql';
import { Admin } from 'src/admins/models/admin.model';

@ObjectType()
export class Auth {
  @Field()
  admin: Admin;
  @Field()
  token: string;
}
