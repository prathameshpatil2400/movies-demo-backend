import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'Title of movie.' })
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ description: 'Publishing year of movie.' })
  publishingYear: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'Poster Image of movie' })
  poster: string;
}
