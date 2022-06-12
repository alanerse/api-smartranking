import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../entities/player.entity';
import { IPlayerRepository } from '../interfaces/player-repository.interface';

export class MongoosePlayerRepository implements IPlayerRepository {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}
  async create(createPlayer: Player): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Player[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(email: string): Promise<Player> {
    throw new Error('Method not implemented.');
  }
  async update(email: string, updatedPlayer: Player): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async remove(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
