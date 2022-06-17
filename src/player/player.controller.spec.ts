import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { PlayerSchema } from '../schemas/player.schema';
import { CreatePlayerDTOStub } from './dto/create-player.dto.stub';
import { UpdatePlayerDTOStub } from './dto/update-player.dto.stub';
import { Player } from './entities/player.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let playerModel: Model<Player>;

  const mockedEmail = 'mocked@email.com';

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    playerModel = mongoConnection.model(Player.name, PlayerSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        PlayerService,
        { provide: getModelToken(Player.name), useValue: playerModel },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
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
    expect(controller).toBeDefined();
  });

  it('should call create with create-player-stub', async () => {
    const stub = CreatePlayerDTOStub();
    const createSpy = jest.spyOn(service, 'create').mockResolvedValue();

    await controller.create(stub);
    expect(createSpy).toBeCalledWith(stub);
  });

  it('should call findOne with mocked-email', async () => {
    const findOneSpy = jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve({} as Player));

    await controller.findOne(mockedEmail);
    expect(findOneSpy).toBeCalledWith(mockedEmail);
  });

  it('should call update with mocked-email and update-player-stub', async () => {
    const stub = UpdatePlayerDTOStub();
    const updateSpy = jest.spyOn(service, 'update').mockResolvedValue();

    await controller.update(mockedEmail, stub);
    expect(updateSpy).toBeCalledWith(mockedEmail, stub);
  });

  it('should call remove with mocked-email', async () => {
    const removeSpy = jest.spyOn(service, 'remove').mockResolvedValue();

    await controller.remove(mockedEmail);
    expect(removeSpy).toBeCalledWith(mockedEmail);
  });
});
