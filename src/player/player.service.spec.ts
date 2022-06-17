import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Model, MongooseError } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Player } from './entities/player.entity';
import { PlayerService } from './player.service';
import { PlayerSchema } from '../schemas/player.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreatePlayerDTOStub } from './dto/create-player.dto.stub';
import { BadRequestException } from '@nestjs/common';

describe('PlayerService', () => {
  let service: PlayerService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let playerModel: Model<Player>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    playerModel = mongoConnection.model(Player.name, PlayerSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        { provide: getModelToken(Player.name), useValue: playerModel },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create a new Player with create-player-stub', async () => {
      const { email, name, phoneNumber } = CreatePlayerDTOStub();
      const createSpy = jest.spyOn(playerModel, 'create');
      const stubPlayer = Player.create({
        email,
        name,
        phoneNumber,
        ranking: '',
        rankingPosition: 20,
        urlPlayerPhoto: '',
      });
      await service.create(stubPlayer);

      expect(createSpy).toBeCalledWith(stubPlayer);
    });

    it('should trhow an error to create a new player', async () => {
      const stub = CreatePlayerDTOStub();
      const createSpy = jest.spyOn(playerModel, 'create');
      expect(createSpy).toThrow(MongooseError);
    });
  });
});
