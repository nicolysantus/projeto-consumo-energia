import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsumoEnergiaDocument = ConsumoEnergia & Document;

@Schema()
export class ConsumoEnergia {
  @Prop({ required: true })
  usuarioId: string;

  @Prop({ required: true })
  quantidadeKwh: number;

  @Prop({ required: true })
  dataLeitura: Date;
}

export const ConsumoEnergiaSchema = SchemaFactory.createForClass(ConsumoEnergia);
