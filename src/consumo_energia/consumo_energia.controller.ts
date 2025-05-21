import { Controller, Post, Body, Get, Query, Delete, Param } from '@nestjs/common';
import { ConsumoEnergiaService } from './consumo_energia.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Controller('consumo-energia')
export class ConsumoEnergiaController {
  constructor(private readonly consumoService: ConsumoEnergiaService) {}

  @Post('registrar')
  async registrarConsumo(@Body() dto: CreateConsumoDto) {
    return this.consumoService.registrarConsumo(dto);
  }

  @Get('historico')
  async consultarHistorico(
    @Query('usuarioId') usuarioId?: string,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.consumoService.consultarHistorico(usuarioId ?? '', dataInicio ?? '', dataFim ?? '');
  }

  @Get('alerta')
  async gerarAlerta(@Query('usuarioId') usuarioId: string) {
    const alerta = await this.consumoService.gerarAlerta(usuarioId);
    if (alerta) return { alerta };
    return { alerta: 'Nenhum alerta para o usuário.' };
  }

  @Delete(':id')
  async removerConsumo(@Param('id') id: string) {
    const ok = await this.consumoService.removerConsumo(id);
    if (ok) {
      return { success: true };
    } else {
      return { success: false, message: 'Registro não encontrado.' };
    }
  }
}
