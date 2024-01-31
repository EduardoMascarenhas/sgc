import { PrismaService } from 'nestjs-prisma';
import { ApolloError } from 'apollo-server-core';
import { Admin } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SigninAdminInput } from './dto/signin-admin.input';
import { Auth } from './models/auth.model';
import { AdminByTokenInput } from './dto/admin-by-token.input';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async isAdmin(context): Promise<Admin> {
    if (context.req.headers.authorization) {
      let headersToken = context.req.headers.authorization;
      headersToken = headersToken.replace('Bearer ', '');
      const decodedToken: any = await jwt.verify(
        headersToken,
        process.env.ADMIN_SECRET_KEY,
        async (err, decoded: any) => {
          if (err) {
            throw new ApolloError(`Token Inválido!`, '400');
          }
          if (decoded) {
            const loggedAdmin = await this.prisma.admin.findUnique({
              where: {
                id: decoded.adminId,
              },
            });
            if (loggedAdmin) {
              return loggedAdmin;
            } else {
              throw new ApolloError(
                `Administrador não encontrado! Por favor efetue o login e tente novamente!`,
                '400',
              );
            }
          }
        },
      );
      return decodedToken;
    } else {
      throw new ApolloError(
        `Acesso Restrito! É nescessário efetuar o login para ter acesso a este recurso!`,
        '400',
      );
    }
  }

  async signInAdmin(payload: SigninAdminInput): Promise<Auth> {
    const admin: Admin = await this.prisma.admin.findFirst({
      where: {
        email: payload.email,
      },
    });
    if (admin) {
      let pass = '';
      let hashed = '';
      pass = payload.password;
      hashed = admin.hashedPassword;
      const passWordMatches = await bcrypt.compare(pass, hashed);
      if (passWordMatches) {
        const token = jwt.sign(
          { adminId: admin.id },
          process.env.ADMIN_SECRET_KEY,
          { expiresIn: 28800 },
        );
        return {
          admin: {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            createdAt: admin.createdAt,
            updatedAt: admin.updatedAt,
          },
          token,
        };
      } else {
        throw new ApolloError(
          `Senha incorreta! Por favor tente novamente!`,
          '400',
        );
      }
    } else {
      throw new ApolloError(`Não foi possível efetuar o login do Admin`, '400');
    }
  }

  async adminByToken(payload: AdminByTokenInput): Promise<Admin> {
    const decodedToken: any = jwt.decode(payload.token, {
      complete: true,
    });

    if (decodedToken && decodedToken.header) {
      try {
        jwt.verify(payload.token, process.env.ADMIN_SECRET_KEY, {
          algorithms: ['HS256'],
        });
        const thisAdmin = await this.prisma.admin.findUnique({
          where: {
            id: decodedToken.payload.adminId,
          },
        });
        return thisAdmin;
      } catch (error) {
        console.log(error);
        throw new ApolloError('Token inválido!', '400');
      }
    }
    throw new ApolloError(
      'É preciso estar logado para efetuar esta ação!',
      '400',
    );
  }
}
