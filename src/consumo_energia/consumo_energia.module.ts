import { Module } from '@nestjs/common';
import { ConsumoEnergiaController } from './consumo_energia.controller';
import { ConsumoEnergiaService } from './consumo_energia.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumoEnergia, ConsumoEnergiaSchema } from './schemas/consumo_energia.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConsumoEnergia.name, schema: ConsumoEnergiaSchema },
    ]),
  ],
  controllers: [ConsumoEnergiaController],
  providers: [ConsumoEnergiaService],
})
export class ConsumoEnergiaModule {}
