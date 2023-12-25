import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MovieDto {
  @ApiProperty({ description: 'Id of the movie.' })
  @Expose()
  _id: string;

  @ApiProperty({ description: 'Title of movie.' })
  @Expose()
  title: string;

  @ApiProperty({ description: 'Publishing year of movie.' })
  @Expose()
  publishingYear: number;

  @ApiProperty({ description: 'Poster link movie.' })
  @Expose()
  poster: string;

  @ApiProperty({ description: 'Record owner of movie.' })
  @Expose()
  createdBy: string;

  @ApiProperty({ description: 'Record insertion date of movie.' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'Last updated date of movie.' })
  @Expose()
  updatedAt: Date;
}
