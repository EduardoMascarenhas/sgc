import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { Admin } from './models/admin.model';
import { AuthService } from 'src/auth/auth.service';
import { AdminsService } from './admins.service';
import { FindAdminInput } from './dto/find-admin.input';
import { Client } from 'src/clients/models/client.model';
import { FindClientInput } from 'src/clients/dto/find-client.input';
import { Admins } from './models/admins.model';
import { FindAdminsPaginatedInput } from './dto/find-admin-paginated.input';
import { Clients } from 'src/clients/models/clients.model';
import { FindClientsPaginatedInput } from 'src/clients/dto/find-client-paginated.input';
import { CreateClientInput } from 'src/clients/dto/create-client.input';

@Resolver(() => Admin)
export class AdminsResolver {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
    private adminsService: AdminsService,
  ) {}

  //QUERY
  @Query(() => Admin)
  async findAdmin(@Args('data') data: FindAdminInput, @Context() context) {
    return await this.adminsService.getAdmin(data, context);
  }
  @Query(() => Admins)
  async findAdmins(
    @Args('data') data: FindAdminsPaginatedInput,
    @Context() context,
  ) {
    return await this.adminsService.getAdminsPaginated(data, context);
  }

  @Query(() => Client)
  async findClient(@Args('data') data: FindClientInput, @Context() context) {
    return await this.adminsService.getClient(data, context);
  }

  @Query(() => Clients)
  async findClients(
    @Args('data') data: FindClientsPaginatedInput,
    @Context() context,
  ) {
    return await this.adminsService.getClientsPaginated(data, context);
  }

  @Query(() => String)
  async calculateRoute(@Context() context) {
    return await this.adminsService.calculateRoute(context);
  }

  //MUTATION
  @Mutation(() => Client)
  async adminCreateClient(
    @Args('data') data: CreateClientInput,
    @Context() context,
  ) {
    return await this.adminsService.adminCreateClient(data, context);
  }
  @Mutation(() => Client)
  async adminRemoveClient(
    @Args('data') data: FindClientInput,
    @Context() context,
  ) {
    return await this.adminsService.adminDeleteClient(data, context);
  }
  @Mutation(() => Client)
  async adminEditClient(
    @Args('data') data: CreateClientInput,
    @Context() context,
  ) {
    return await this.adminsService.adminEditClient(data, context);
  }
}
