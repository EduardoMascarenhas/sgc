import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { Client } from './models/client.model';
import { AuthService } from 'src/auth/auth.service';
import { ClientsService } from './clients.service';
import { FindClientInput } from './dto/find-client.input';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
    private clientsService: ClientsService,
  ) {}

  //QUERY

  //MUTATION
}
