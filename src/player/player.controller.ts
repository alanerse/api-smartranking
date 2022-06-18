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
import { PlayerService } from './player.service';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { FindPlayerParamsValidation } from '../common/pipes/find-player-params-validation.pipe';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDTO) {
    return await this.playerService.create(createPlayerDto);
  }

  @Get()
  async findAll() {
    return this.playerService.findAll();
  }

  @Get('/search')
  async findOne(@Query('email', FindPlayerParamsValidation) email: string) {
    return this.playerService.findOne(email);
  }

  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updatePlayerDto: UpdatePlayerDTO,
  ) {
    return await this.playerService.update(email, updatePlayerDto);
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    return await this.playerService.remove(email);
  }
}
