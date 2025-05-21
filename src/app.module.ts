import { Module } from '@nestjs/common';
import { ConsumoEnergiaModule } from './consumo_energia/consumo_energia.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'consumo_energia', 'public'),
      exclude: ['/consumo-energia', '/consumo-energia/*'], // Corrigido para não interceptar rotas da API
    }),
    ConsumoEnergiaModule,
  ],
})
export class AppModule {}
