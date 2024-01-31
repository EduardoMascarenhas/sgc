import { Module } from '@nestjs/common';
import { AdminsResolver } from './admins.resolver';
import { AdminsService } from './admins.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AdminsResolver, AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
