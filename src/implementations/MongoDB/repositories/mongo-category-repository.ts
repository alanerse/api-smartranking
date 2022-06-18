import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../../../player/entities/player.entity';
import { Category, Contest } from '../../../category/entities/category.entity';
import { CategoryRepository } from '../../../category/interfaces/category-repository.interface';

export class MongoCategoryRepository implements CategoryRepository {
  constructor(
    @InjectModel('Category') private readonly playerModel: Model<Category>,
  ) {}

  async create(category: Category): Promise<void> {
    await this.playerModel.create(category);
    return;
  }
  async findAll(): Promise<Category[]> {
    return await this.playerModel.find({});
  }
  async findOne(email: string): Promise<Category> {
    return await this.playerModel.findOne({ email: email });
  }
  async update(
    name: string,
    description: string,
    contests: Array<Contest>,
    players: Array<Player>,
  ): Promise<void> {
    await this.playerModel.updateOne(
      { name: name },
      {
        description: description,
        contests: contests,
        players: players,
      },
    );
    return;
  }
  async remove(email: string): Promise<void> {
    await this.playerModel.deleteOne({ email: email });
    return;
  }
}
