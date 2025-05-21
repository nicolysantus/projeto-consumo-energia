import { Injectable, BadRequestException } from '@nestjs/common';
import { ConsumoEnergia } from './consumo_energia.model';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Injectable()
export class ConsumoEnergiaService {
  private consumos: ConsumoEnergia[] = [];
  private idCounter = 1;

  registrarConsumo(dto: CreateConsumoDto): ConsumoEnergia {
    const { usuarioId, quantidadeKwh, dataLeitura } = dto;
    const data = new Date(dataLeitura);
    if (isNaN(data.getTime())) throw new BadRequestException('Data inválida');
    const novoConsumo: ConsumoEnergia = {
      id: this.idCounter++,
      usuarioId,
      quantidadeKwh,
      dataLeitura: data,
    };
    this.consumos.push(novoConsumo);
    return novoConsumo;
  }

  consultarHistorico(usuarioId: string, dataInicio: string, dataFim: string): ConsumoEnergia[] {
    // Se usuarioId for vazio, retorna todos os registros
    const inicio = dataInicio ? new Date(dataInicio) : new Date('2000-01-01');
    const fim = dataFim ? new Date(dataFim) : new Date('2100-12-31');
    return this.consumos.filter(c => 
      (!usuarioId || c.usuarioId === usuarioId) &&
      c.dataLeitura >= inicio &&
      c.dataLeitura <= fim
    ).sort((a, b) => a.dataLeitura.getTime() - b.dataLeitura.getTime());
  }

  gerarAlerta(usuarioId: string): string | null {
    const registrosUsuario = this.consumos
      .filter(c => c.usuarioId === usuarioId)
      .sort((a, b) => a.dataLeitura.getTime() - b.dataLeitura.getTime());
    if (registrosUsuario.length < 2) return null;
    const ultimo = registrosUsuario[registrosUsuario.length - 1];
    const penultimo = registrosUsuario[registrosUsuario.length - 2];
    if (ultimo.quantidadeKwh > penultimo.quantidadeKwh) {
      return `Alerta: consumo elevado em ${ultimo.dataLeitura.toISOString().substring(0,10)}. Consumo atual: ${ultimo.quantidadeKwh} kWh, consumo anterior: ${penultimo.quantidadeKwh} kWh.`;
    }
    return null;
  }

  removerConsumo(id: number): boolean {
    const index = this.consumos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.consumos.splice(index, 1);
      return true;
    }
    return false;
  }
}
