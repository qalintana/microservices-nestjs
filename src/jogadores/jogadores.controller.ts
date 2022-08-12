import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultaJogadores(
    @Query('email') email?: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return this.jogadoresService.consultarJogadorPeloEmail(email);
    } else {
      return this.jogadoresService.consultarTodosJogadores();
    }
  }
}
