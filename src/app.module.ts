import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot('mongodb://localhost:27017/apijogadores'),
  ],
})
export class AppModule {}
