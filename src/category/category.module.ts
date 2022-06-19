import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongoCategoryRepository } from '../implementations/MongoDB/repositories/mongo-category-repository';
import { CATEGORY_REPOSITORY } from './interfaces/category-repository.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../implementations/MongoDB/schemas/category.schema';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    PlayerModule,
  ],
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
