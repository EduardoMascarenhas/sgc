import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ClientsService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
  ) {}

  //QUERIES

  //MUTATIONS
}
