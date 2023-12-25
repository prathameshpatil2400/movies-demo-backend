import { ApiProperty } from '@nestjs/swagger';
import { MovieDto } from './movie.dto';
import { Expose } from 'class-transformer';

export class ListMoviesResponse {
  @ApiProperty({ description: 'Current page number.' })
  @Expose()
  page: number;

  @ApiProperty({ description: 'Record length.' })
  @Expose()
  limit: number;

  @ApiProperty({ description: 'List of movies.', type: [MovieDto] })
  @Expose()
  movies: MovieDto[];

  @ApiProperty({ description: 'Total available pages of movies.' })
  @Expose()
  totalPages: number;
}
