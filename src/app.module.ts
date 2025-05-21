import { Module } from '@nestjs/common';
import { ConsumoEnergiaModule } from './consumo_energia/consumo_energia.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'consumo_energia', 'public'),
      exclude: ['/consumo-energia', '/consumo-energia/*'], // Corrigido para não interceptar rotas da API
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/consumoenergia'),
    ConsumoEnergiaModule,
  ],
})
export class AppModule {}
