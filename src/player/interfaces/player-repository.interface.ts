import { Player } from '../entities/player.entity';

export interface IPlayerRepository {
  create(createPlayer: Player): Promise<void>;
  findAll(): Promise<Player[]>;
  findOne(email: string): Promise<Player>;
  update(email: string, updatedPlayer: Player): Promise<void>;
  remove(email: string): Promise<void>;
}
