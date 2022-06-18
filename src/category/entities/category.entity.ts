import { Player } from '../../player/entities/player.entity';

export class Category {
  readonly name: string;
  description: string;
  contests: Array<Contest>;
  players: Array<Player>;

  constructor(
    name: string,
    description: string,
    contests: Array<Contest>,
    players: Array<Player>,
  ) {
    this.name = name;
    this.description = description;
    this.contests = contests;
    this.players = players;
  }

  public static create(opts: Category) {
    const { name, description, contests, players } = opts;

    //Here we can do some valitadions before instantiate the obj;

    return new Category(name, description, contests, players);
  }
}

export interface Contest {
  name: string;
  operation: string;
  value: number;
}
