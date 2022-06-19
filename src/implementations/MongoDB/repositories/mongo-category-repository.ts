import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../../../player/entities/player.entity';
import { Category, Contest } from '../../../category/entities/category.entity';
import { CategoryRepository } from '../../../category/interfaces/category-repository.interface';

export class MongoCategoryRepository implements CategoryRepository {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(category: Category): Promise<void> {
    await this.categoryModel.create(category);
    return;
  }
  async findAll(page: number, limit: number): Promise<Category[]> {
    return await this.categoryModel
      .find({})
      .limit(limit)
      .skip((page - 1) * limit);
  }
  async findOne(name: string): Promise<Category> {
    return await this.categoryModel.findOne({ name: name }).populate('players');
  }
  async update(
    name: string,
    description: string,
    contests: Array<Contest>,
    players: Array<Player>,
  ): Promise<void> {
    await this.categoryModel.updateOne(
      { name: name },
      {
        description: description,
        contests: contests,
        players: players,
      },
    );
    return;
  }
  async remove(name: string): Promise<void> {
    await this.categoryModel.deleteOne({ name: name });
    return;
  }
}
