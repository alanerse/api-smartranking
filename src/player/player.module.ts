import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from '../implementations/MongoDB/schemas/player.schema';
import { MongoPlayerRepository } from 'src/implementations/MongoDB/repositories/mongo-player-repository';
import { PLAYER_REPOSITORY } from './interfaces/player-repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
  ],
  controllers: [PlayerController],
  providers: [
    {
      provide: PLAYER_REPOSITORY,
      useClass: MongoPlayerRepository,
    },
    PlayerService,
  ],
})
export class PlayerModule {}
