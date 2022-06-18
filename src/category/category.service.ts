import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Player } from '../player/entities/player.entity';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { Category, Contest } from './entities/category.entity';
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
    const { name, description, contests } = createCategoryDTO;

    const category = await this.categoryRepository.findOne(name);
    if (category)
      throw new BadRequestException(`${name} category already exists`);

    const newCategory = Category.create({
      name,
      description,
      contests,
      players: [],
    });

    await this.categoryRepository.create(newCategory);

    return;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findOne(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(name);
    if (!category) throw new NotFoundException(`${name} category not found`);
    return category;
  }

  async update(
    name: string,
    updateCategoryDto: UpdateCategoryDTO,
  ): Promise<void> {
    const { description } = updateCategoryDto;
    await this.categoryRepository.update(name, description);
    return;
  }

  async addContest(name: string, contest: Contest): Promise<void> {
    const category = await this.categoryRepository.findOne(name);
    if (!category) throw new NotFoundException(`${name} category not found`);

    category.contests.push(contest);

    await this.categoryRepository.update(
      name,
      category.description,
      category.contests,
      category.players,
    );
    return;
  }

  async addPlayer(name: string, player: Player): Promise<void> {
    const category = await this.categoryRepository.findOne(name);
    if (!category) throw new NotFoundException(`${name} category not found`);

    category.players.push(player);

    await this.categoryRepository.update(
      name,
      category.description,
      category.contests,
      category.players,
    );
    return;
  }

  async remove(name: string): Promise<void> {
    await this.categoryRepository.remove(name);
    return;
  }
}
