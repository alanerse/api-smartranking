import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDTO {
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
