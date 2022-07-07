import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import {
  PlayerRepository,
  PLAYER_REPOSITORY,
} from './interfaces/player-repository.interface';

@Injectable()
export class PlayerService {
  constructor(
    @Inject(PLAYER_REPOSITORY)
    private playerRepository: PlayerRepository,
  ) {}

  async create(createPlayerDto: CreatePlayerDTO): Promise<void> {
    const { email, name, phoneNumber } = createPlayerDto;

    const player = await this.playerRepository.findOne(email);
    if (player) throw new BadRequestException(`${email} already exists`);

    const newPlayer = Player.create({
      email,
      name,
      phoneNumber,
      ranking: '',
      rankingPosition: 20,
      urlPlayerPhoto: '',
    });

    await this.playerRepository.create(newPlayer);
    return;
  }

  async findAll(page: number): Promise<Player[]> {
    return await this.playerRepository.findAll(page ?? 1, 5);
  }

  async findOne(email: string): Promise<Player> {
    const player = await this.playerRepository.findOne(email);
    if (!player) throw new NotFoundException(`${email} not found`);
    return player;
  }

  async update(email: string, updatePlayerDTO: UpdatePlayerDTO): Promise<void> {
    const player = await this.playerRepository.findOne(email);
    if (!player) throw new NotFoundException(`${email} not found`);
    const { name, phoneNumber } = updatePlayerDTO;
    await this.playerRepository.update(email, name, phoneNumber);
    return;
  }

  async remove(email: string): Promise<void> {
    const player = await this.playerRepository.findOne(email);
    if (!player) throw new NotFoundException(`${email} not found`);
    await this.playerRepository.remove(email);
    return;
  }
}
