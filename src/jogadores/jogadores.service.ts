import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.logger.log(`Cria jogador Dto: ${criarJogadorDto.nome}`);
    await this.criar(criarJogadorDto);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { nome, email, telefoneCelular } = criarJogadorDto;
    const jogador: Jogador = {
      _id: uuid(),
      email,
      nome,
      telefoneCelular,
      ranking: `A`,
      posicaoRanking: 1,
      urlFotoJogador: `www.foto.jogador`,
    };
    this.jogadores.push(jogador);
  }
}
