import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsumoEnergia, ConsumoEnergiaDocument } from './schemas/consumo_energia.schema';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Injectable()
export class ConsumoEnergiaService {
  constructor(
    @InjectModel(ConsumoEnergia.name)
    private consumoModel: Model<ConsumoEnergiaDocument>,
  ) {}

  async registrarConsumo(dto: CreateConsumoDto): Promise<ConsumoEnergia> {
    const { usuarioId, quantidadeKwh, dataLeitura } = dto;
    const data = new Date(dataLeitura);
    if (isNaN(data.getTime())) throw new BadRequestException('Data inválida');
    const novoConsumo = new this.consumoModel({
      usuarioId,
      quantidadeKwh,
      dataLeitura: data,
    });
    return novoConsumo.save();
  }

  async consultarHistorico(usuarioId: string, dataInicio: string, dataFim: string): Promise<ConsumoEnergia[]> {
    const inicio = dataInicio ? new Date(dataInicio) : new Date('2000-01-01');
    const fim = dataFim ? new Date(dataFim) : new Date('2100-12-31');
    const filtro: any = {
      dataLeitura: { $gte: inicio, $lte: fim },
    };
    if (usuarioId) filtro.usuarioId = usuarioId;
    return this.consumoModel.find(filtro).sort({ dataLeitura: 1 }).exec();
  }

  async gerarAlerta(usuarioId: string): Promise<string | null> {
    const registrosUsuario = await this.consumoModel.find({ usuarioId }).sort({ dataLeitura: 1 }).exec();
    if (registrosUsuario.length < 2) return null;
    const ultimo = registrosUsuario[registrosUsuario.length - 1];
    const penultimo = registrosUsuario[registrosUsuario.length - 2];
    if (ultimo.quantidadeKwh > penultimo.quantidadeKwh) {
      return `Alerta: consumo elevado em ${ultimo.dataLeitura.toISOString().substring(0,10)}. Consumo atual: ${ultimo.quantidadeKwh} kWh, consumo anterior: ${penultimo.quantidadeKwh} kWh.`;
    }
    return null;
  }

  async removerConsumo(id: string): Promise<boolean> {
    const res = await this.consumoModel.deleteOne({ _id: id });
    return res.deletedCount > 0;
  }
}
