import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import * as dotenv from 'dotenv';
import { ApolloError } from 'apollo-server-core';
import { Admin, Client } from '@prisma/client';
import { FindAdminInput } from './dto/find-admin.input';
import { FindClientInput } from 'src/clients/dto/find-client.input';
import { Clients } from 'src/clients/models/clients.model';
import { FindClientsPaginatedInput } from 'src/clients/dto/find-client-paginated.input';
import { FindAdminsPaginatedInput } from './dto/find-admin-paginated.input';
import { Admins } from './models/admins.model';
import { CreateClientInput } from 'src/clients/dto/create-client.input';
import { solveTsp } from 'src/common/tspSolver';

dotenv.config();

@Injectable()
export class AdminsService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
  ) {}

  //QUERIES
  async getAdmin(payload: FindAdminInput, context): Promise<Admin> {
    const loggedAdmin = await this.auth.isAdmin(context);

    return await this.prisma.admin.findUnique({
      where: {
        id: payload.id,
        email: payload.email,
        name: {
          contains: payload.name,
        },
      },
    });
  }

  async getAdminsPaginated(
    payload: FindAdminsPaginatedInput,
    context,
  ): Promise<Admins> {
    const loggedAdmin = await this.auth.isAdmin(context);

    const allAdmins = await this.prisma.admin.findMany({
      skip: payload.skip,
      take: payload.take,
      where: {
        id: payload.id,
        email: payload.email,
        name: {
          contains: payload.name,
        },
      },
    });
    const allAdminsCount = await this.prisma.admin.count();

    return {
      admins: allAdmins,
      count: allAdminsCount,
    };
  }

  async getClient(payload: FindClientInput, context): Promise<Client> {
    const loggedAdmin = await this.auth.isAdmin(context);

    return await this.prisma.client.findUnique({
      where: {
        id: payload.id,
        name: {
          contains: payload.name,
        },
        email: payload.email,
        tel: payload.tel,
      },
    });
  }

  async getClientsPaginated(
    payload: FindClientsPaginatedInput,
    context,
  ): Promise<Clients> {
    const loggedAdmin = await this.auth.isAdmin(context);

    const allClients = await this.prisma.client.findMany({
      skip: payload.skip,
      take: payload.take,
      where: {
        id: payload.id,
        name: {
          contains: payload.name,
        },
        email: {
          contains: payload.email,
        },
        tel: {
          contains: payload.tel,
        },
      },
    });
    const allClientsCount = await this.prisma.client.count();

    return {
      clients: allClients,
      count: allClientsCount,
    };
  }

  async calculateRoute(context): Promise<any> {
    const loggedAdmin = await this.auth.isAdmin(context);
    const clients = await this.prisma.client.findMany({});

    const rotaCalculada = solveTsp(clients);
    return JSON.stringify(rotaCalculada);
  }

  //MUTATIONS
  async adminCreateClient(
    payload: CreateClientInput,
    context,
  ): Promise<Client> {
    const loggedAdmin = await this.auth.isAdmin(context);

    if (!payload.name) {
      throw new ApolloError('É nescessário inserir um nome!', '400');
    }
    if (!payload.email) {
      throw new ApolloError('É nescessário inserir um email válido!', '400');
    }
    if (!payload.tel) {
      throw new ApolloError('É nescessário inserir um telefone!', '400');
    }
    if (!payload.coordX) {
      throw new ApolloError('É nescessário inserir a coordenada X!', '400');
    }
    if (!payload.coordY) {
      throw new ApolloError('É nescessário inserir a coordenada Y!', '400');
    }
    const newClient = await this.prisma.client.create({
      data: {
        name: payload.name,
        email: payload.email,
        tel: payload.tel,
        coordX: payload.coordX,
        coordY: payload.coordY,
      },
    });

    return newClient;
  }
  async adminDeleteClient(payload: FindClientInput, context): Promise<Client> {
    const loggedAdmin = await this.auth.isAdmin(context);

    const removedClient = await this.prisma.client.delete({
      where: {
        id: payload.id,
      },
    });

    return removedClient;
  }
  async adminEditClient(payload: CreateClientInput, context): Promise<Client> {
    const loggedAdmin = await this.auth.isAdmin(context);

    const editClient = await this.prisma.client.update({
      where: {
        id: payload.id,
      },
      data: {
        email: payload.email,
        name: payload.name,
        tel: payload.tel,
        coordX: payload.coordX,
        coordY: payload.coordY,
      },
    });

    return editClient;
  }
}
