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
  async findAll(): Promise<Player[]> {
    return await this.playerModel.find({});
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
