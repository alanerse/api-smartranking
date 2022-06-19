import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from 'src/player/entities/player.entity';
import { PlayerRepository } from '../../../player/interfaces/player-repository.interface';

export class MongoPlayerRepository implements PlayerRepository {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(player: Player): Promise<void> {
    await this.playerModel.create(player);
    return;
  }
  async findAll(page: number, limit: number): Promise<Player[]> {
    return await this.playerModel
      .find({})
      .limit(limit)
      .skip((page - 1) * limit);
  }
  async findOne(email: string): Promise<Player> {
    return await this.playerModel.findOne({ email: email });
  }
  async update(
    email: string,
    name: string,
    phoneNumber: string,
  ): Promise<void> {
    await this.playerModel.updateOne(
      { email: email },
      { name: name, phoneNumber: phoneNumber },
    );
    return;
  }
  async remove(email: string): Promise<void> {
    await this.playerModel.remove({ email: email });
    return;
  }
}
