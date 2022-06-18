import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Contest } from '../entities/category.entity';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  contests: Array<Contest>;
}
