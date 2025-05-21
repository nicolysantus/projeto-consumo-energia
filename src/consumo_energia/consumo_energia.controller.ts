import { Controller, Post, Body, Get, Query, Delete, Param } from '@nestjs/common';
import { ConsumoEnergiaService } from './consumo_energia.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Controller('consumo-energia')
export class ConsumoEnergiaController {
  constructor(private readonly consumoService: ConsumoEnergiaService) {}

  @Post('registrar')
  registrarConsumo(@Body() dto: CreateConsumoDto) {
    return this.consumoService.registrarConsumo(dto);
  }

  @Get('historico')
  consultarHistorico(
    @Query('usuarioId') usuarioId?: string,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.consumoService.consultarHistorico(usuarioId ?? '', dataInicio ?? '', dataFim ?? '');
  }

  @Get('alerta')
  gerarAlerta(@Query('usuarioId') usuarioId: string) {
    const alerta = this.consumoService.gerarAlerta(usuarioId);
    if (alerta) return { alerta };
    return { alerta: 'Nenhum alerta para o usuário.' };
  }

  @Delete(':id')
  removerConsumo(@Param('id') id: string) {
    const ok = this.consumoService.removerConsumo(Number(id));
    if (ok) {
      return { success: true };
    } else {
      return { success: false, message: 'Registro não encontrado.' };
    }
  }
}
