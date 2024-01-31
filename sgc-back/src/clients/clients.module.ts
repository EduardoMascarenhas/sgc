import { Module } from '@nestjs/common';
import { ClientsResolver } from './clients.resolver';
import { ClientsService } from './clients.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ClientsResolver, ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
