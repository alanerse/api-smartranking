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

  @Get(':id')
  async findOne(@Param('id', ParamsValidation) id: string): Promise<Category> {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParamsValidation) id: string,
    @Body() updateCategoryDto: UpdateCategoryDTO,
  ): Promise<void> {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParamsValidation) id: string): Promise<void> {
    return this.categoryService.remove(+id);
  }
}
