import { Inject, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { IPlayerRepository } from './interfaces/player-repository.interface';

@Injectable()
export class PlayerService {
  constructor(@Inject() private readonly playerRepository: IPlayerRepository) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email, name, phoneNumber } = createPlayerDto;

    const newPlayer = Player.create({
      email,
      name,
      phoneNumber,
      ranking: '',
      rankingPosition: 20,
      urlPlayerPhoto: '',
    });

    await this.playerRepository.create(newPlayer);
  }

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.findAll();
  }

  async findOne(email: string): Promise<Player> {
    const player = await this.playerRepository.findOne(email);
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    return;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}
