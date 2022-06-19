import { Player } from '../entities/player.entity';

export const PLAYER_REPOSITORY = 'PLAYER REPOSITORY';

export interface PlayerRepository {
  create(player: Player): Promise<void>;
  findAll(page: number, limit: number): Promise<Player[]>;
  findOne(email: string): Promise<Player>;
  update(email: string, name: string, phoneNumber: string): Promise<void>;
  remove(email: string): Promise<void>;
}
