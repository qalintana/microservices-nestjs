import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.logger.log(`Cria jogador Dto: ${criarJogadorDto.nome}`);
    const { email } = criarJogadorDto;

    // const jogadorEncontrado = await this.jogadores.find(
    //   (jogador) => email === jogador.email,
    // );

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      this.atualizar(criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com o ${email} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);

    return await jogadorCriado.save();

    //   ranking: `A`,
    //   posicaoRanking: 1,
    //   urlFotoJogador: `www.foto.jogador`,
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();

    // const { nome } = criarJogadorDto;
    // jogadorEncontrado.nome = nome;
  }
}
