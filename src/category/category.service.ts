import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import {
  CategoryRepository,
  CATEGORY_REPOSITORY,
} from './interfaces/category-repository.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private categoryRepository: CategoryRepository,
  ) {}

  async create(createCategoryDTO: CreateCategoryDTO): Promise<void> {
    return;
  }

  async findAll(): Promise<Category[]> {
    return [];
  }

  async findOne(id: number): Promise<Category> {
    return {} as Category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDTO,
  ): Promise<void> {
    return;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}
