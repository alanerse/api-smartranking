import { CreatePlayerDTO } from './create-player.dto';

export const CreatePlayerDTOStub = (): CreatePlayerDTO => {
  return {
    email: 'stub@email.com',
    name: 'Stub Name',
    phoneNumber: '31987654321',
  };
};
