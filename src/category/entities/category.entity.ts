import { Player } from '../../player/entities/player.entity';

export class Category {
  readonly name: string;
  description: string;
  events: Array<Event>;
  players: Array<Player>;

  constructor(
    name: string,
    description: string,
    events?: Array<Event>,
    players?: Array<Player>,
  ) {
    this.name = name;
    this.description = description;
    this.events = events;
    this.players = players;
  }

  public static create(opts: Category) {
    const { name, description, events, players } = opts;

    //Here we can do some valitadions before instantiate the obj;

    return new Category(name, description, events, players);
  }
}

export class Event {
  name: string;
  operation: string;
  value: number;

  constructor(name: string, operation: string, value: number) {
    this.name = name;
    this.operation = operation;
    this.value = value;
  }

  public static create(opts: Event) {
    const { name, operation, value } = opts;

    //Here we can do some valitadions before instantiate the obj;

    return new Event(name, operation, value);
  }
}
