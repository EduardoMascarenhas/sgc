import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { SigninAdminInput } from './dto/signin-admin.input';
import { Query } from '@nestjs/common';
import { AdminByTokenInput } from './dto/admin-by-token.input';
import { Admin } from 'src/admins/models/admin.model';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  //QUERYS

  //MUTATIONS
  @Mutation(() => Auth)
  async signInAdmin(@Args('data') data: SigninAdminInput) {
    return await this.auth.signInAdmin(data);
  }

  @Mutation(() => Admin)
  async adminByToken(@Args('data') data: AdminByTokenInput) {
    return await this.auth.adminByToken(data);
  }
}
