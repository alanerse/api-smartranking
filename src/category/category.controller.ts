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
  Query,
} from '@nestjs/common';
import { ParamsValidation } from 'src/common/pipes/params-validation.pipe';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCategoryDto: CreateCategoryDTO): Promise<void> {
    await this.categoryService.create(createCategoryDto);
    return;
  }

  @Get()
  async findAll(@Query('page') page: number): Promise<Category[]> {
    return this.categoryService.findAll(page);
  }

  @Get(':name')
  async findOne(
    @Param('name', ParamsValidation) name: string,
  ): Promise<Category> {
    return this.categoryService.findOne(name);
  }

  @Patch(':name')
  @UsePipes(ValidationPipe)
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

  @Post('/:categoryName/player/:playerEmail')
  async addPlayer(
    @Param('categoryName', ParamsValidation) categoryName: string,
    @Param('playerEmail', ParamsValidation) playerEmail: string,
  ) {
    await this.categoryService.addPlayer(categoryName, playerEmail);
  }
}
