import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlayerDTOStub } from './dto/create-player.dto.stub';
import { UpdatePlayerDTOStub } from './dto/update-player.dto.stub';
import { Player } from './entities/player.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;

  const mockedEmail = 'mocked@email.com';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    service = module.get<PlayerService>(PlayerService);
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
