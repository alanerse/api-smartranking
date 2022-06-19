import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PlayerService } from 'src/player/player.service';
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
    @Inject(PlayerService)
    private playerService: PlayerService,
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

  async findAll(page: number): Promise<Category[]> {
    return await this.categoryRepository.findAll(page ?? 1, 10);
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

  async addPlayer(name: string, playerEmail: string): Promise<void> {
    const category = await this.categoryRepository.findOne(name);
    if (!category) throw new NotFoundException(`${name} category not found`);

    const player = await this.playerService.findOne(playerEmail);
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
