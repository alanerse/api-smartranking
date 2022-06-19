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
import { ParamsValidation } from '../common/pipes/params-validation.pipe';

@Controller('api/v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDTO) {
    return await this.playerService.create(createPlayerDto);
  }

  @Get()
  async findAll(@Query('page') page: number) {
    return this.playerService.findAll(page);
  }

  @Get('/email/:email')
  async findOne(@Param('email', ParamsValidation) email: string) {
    return this.playerService.findOne(email);
  }

  @Patch(':email')
  @UsePipes(ValidationPipe)
  async update(
    @Param('email', ParamsValidation) email: string,
    @Body() updatePlayerDto: UpdatePlayerDTO,
  ) {
    return await this.playerService.update(email, updatePlayerDto);
  }

  @Delete(':email')
  async remove(@Param('email', ParamsValidation) email: string) {
    return await this.playerService.remove(email);
  }
}
