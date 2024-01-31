import { Field, ObjectType } from '@nestjs/graphql';
import { Client } from './client.model';

@ObjectType()
export class Clients {
  @Field(() => [Client])
  clients: Client[] | null;
  @Field()
  count: number;
}
