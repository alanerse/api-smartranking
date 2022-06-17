import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDTO): Promise<void> {
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
    return;
  }

  async findAll(): Promise<Player[]> {
    return await this.playerModel.find({});
  }

  async findOne(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email: email });
    if (!player) throw new NotFoundException(`${email} not found`);
    return player;
  }

  async update(email: string, updatePlayerDTO: UpdatePlayerDTO): Promise<void> {
    const player = await this.playerModel.findOne({ email: email });
    if (!player) throw new NotFoundException(`${email} not found`);
    await this.playerModel.updateOne(
      { email: email },
      {
        name: updatePlayerDTO.name,
        phoneNumber: updatePlayerDTO.phoneNumber,
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
