import { Injectable, NotFoundException } from '@nestjs/common';
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

    try {
      await this.playerModel.create(newPlayer);
      return;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Player[]> {
    return await this.playerModel.find({});
  }

  async findOne(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email: email });
    if (!player) throw new NotFoundException(`${email} not found`);
    return player;
  }

  async update(email: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const player = await this.playerModel.findOne({ email: email });
    if (!player) throw new NotFoundException(`${email} not found`);
    await this.playerModel.updateOne(
      { email: email },
      {
        name: updatePlayerDto.name,
        phoneNumber: updatePlayerDto.phoneNumber,
      },
    );

    return;
  }

  async remove(email: string): Promise<void> {
    const player = await this.playerModel.findOne({ email: email });
    if (!player) throw new NotFoundException(`${email} not found`);
    await this.playerModel.deleteOne({ email: email });
    return;
  }
}
