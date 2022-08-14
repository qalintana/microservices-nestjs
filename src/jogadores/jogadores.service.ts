import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { v4 as uuid } from 'uuid';

import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email });
    if (jogadorEncontrado) {
      throw new BadRequestException('Jogador com o email já cadastrado');
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    criarJogadorDto: CriarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException('Jogador que tenta atualizar nao existe');
    }
    await this.jogadorModel.findOneAndUpdate(
      { _id },
      { $set: criarJogadorDto },
    );
  }

  async consultarJogadorPeloId(id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findById(id).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não foi encontrado`);
    }
    return jogadorEncontrado;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async deletarJogador(email: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ email }).exec();
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);

    return await jogadorCriado.save();
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel.findOneAndUpdate(
      { email: criarJogadorDto.email },
      { $set: criarJogadorDto },
    );
  }
}
