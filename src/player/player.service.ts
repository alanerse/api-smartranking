import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { phoneNumber, email, name } = createPlayerDto;
    try {
      const newPlayer = await this.playerModel.create({
        phoneNumber,
        email,
        name,
      });

      if (!newPlayer._id) {
        throw new Error('deu nao');
      }

      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Player[]> {
    return await this.playerModel.find({});
  }

  async findOne(email: string): Promise<Player> {
    try {
      const player = await this.playerModel.findOne({ email: email });
      if (!player) throw new Error('sumiu');
      return player;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    return;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}
