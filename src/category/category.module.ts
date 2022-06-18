import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongoCategoryRepository } from '../implementations/MongoDB/repositories/mongo-category-repository';
import { CATEGORY_REPOSITORY } from './interfaces/category-repository.interface';

@Module({
  controllers: [CategoryController],
  providers: [
    {
      provide: CATEGORY_REPOSITORY,
      useClass: MongoCategoryRepository,
    },
    CategoryService,
  ],
})
export class CategoryModule {}
