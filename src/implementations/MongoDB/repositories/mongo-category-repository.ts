import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../../../category/entities/category.entity';
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
