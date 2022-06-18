import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ParamsValidation } from 'src/common/pipes/params-validation.pipe';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCategoryDto: CreateCategoryDTO): Promise<void> {
    await this.categoryService.create(createCategoryDto);
    return;
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':name')
  async findOne(
    @Param('name', ParamsValidation) name: string,
  ): Promise<Category> {
    return this.categoryService.findOne(name);
  }

  @Patch(':name')
  async update(
    @Param('name', ParamsValidation) name: string,
    @Body() updateCategoryDto: UpdateCategoryDTO,
  ): Promise<void> {
    return this.categoryService.update(name, updateCategoryDto);
  }

  @Delete(':name')
  async remove(@Param('name', ParamsValidation) name: string): Promise<void> {
    return this.categoryService.remove(name);
  }
}
