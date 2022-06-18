import { Category } from '../entities/category.entity';

export const CATEGORY_REPOSITORY = 'CATEGORY REPOSITORY';

export interface CategoryRepository {
  create(player: Category): Promise<void>;
  findAll(): Promise<Category[]>;
  findOne(email: string): Promise<Category>;
  update(email: string, name: string, phoneNumber: string): Promise<void>;
  remove(email: string): Promise<void>;
}
