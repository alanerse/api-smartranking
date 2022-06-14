import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

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

    await this.playerModel.create(newPlayer);
  }

  async findAll(): Promise<Player[]> {
    return await this.playerModel.find({});
  }

  async findOne(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email: email });
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    return;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}
