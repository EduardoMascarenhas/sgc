import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Teste de Programação Desenvolvedor Facilita Jurídico - Eduardo Mendes Souza Mascarenhas';
  }
}
