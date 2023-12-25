import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsDefined,
  IsNotEmpty,
} from 'class-validator';

export class CreateMovieDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Title of movie.' })
  title: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'Publishing year of movie.' })
  publishingYear: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Poster Image of movie' })
  poster: string;
}
