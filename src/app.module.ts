import { Module } from '@nestjs/common';
import { ConsumoEnergiaModule } from './consumo_energia/consumo_energia.module';

@Module({
  imports: [ConsumoEnergiaModule],
})
export class AppModule {}
