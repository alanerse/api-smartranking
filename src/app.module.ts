import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/smartranking', {}),
    PlayerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
