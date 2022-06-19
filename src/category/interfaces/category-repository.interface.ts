import { Player } from 'src/player/entities/player.entity';
import { Category, Contest } from '../entities/category.entity';

export const CATEGORY_REPOSITORY = 'CATEGORY REPOSITORY';

export interface CategoryRepository {
  create(category: Category): Promise<void>;
  findAll(page: number, limit: number): Promise<Category[]>;
  findOne(name: string): Promise<Category>;
  update(
    name: string,
    description?: string,
    contests?: Array<Contest>,
    players?: Array<Player>,
  ): Promise<void>;
  remove(name: string): Promise<void>;
}
