import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayerService {
  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    return;
  }

  async findAll(): Promise<Player[]> {
    return [];
  }

  async findOne(id: number): Promise<Player> {
    return {} as Player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    return;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}
