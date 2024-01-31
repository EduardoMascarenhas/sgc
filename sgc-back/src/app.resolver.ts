import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { Admin } from './admins/models/admin.model';
import { ApolloError } from 'apollo-server-core';

@Resolver()
export class AppResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  helloWorld(): string {
    return 'Olá Mundo!';
  }
  @Query(() => String)
  hello(@Args('name') name: string): string {
    return `Olá ${name} seja bem vindo(a)!`;
  }
}
