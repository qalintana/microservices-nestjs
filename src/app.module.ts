import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot('mongodb://localhost:27017/apijogadores'),
    CategoriasModule,
  ],
})
export class AppModule {}
