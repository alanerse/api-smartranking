export class Player {
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  ranking: string;
  rankingPosition: number;
  urlPlayerPhoto: string;

  constructor(
    email: string,
    name: string,
    phoneNumber: string,
    urlPlayerPhoto: string,
    ranking?: string,
    rankingPosition?: number,
  ) {
    this.email = email;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.urlPlayerPhoto = urlPlayerPhoto;
    this.ranking = ranking;
    this.rankingPosition = rankingPosition;
  }

  public static create(opts: Player) {
    const {
      email,
      name,
      phoneNumber,
      urlPlayerPhoto,
      ranking,
      rankingPosition,
    } = opts;

    return new Player(
      email,
      name,
      phoneNumber,
      urlPlayerPhoto,
      ranking,
      rankingPosition,
    );
  }
}
