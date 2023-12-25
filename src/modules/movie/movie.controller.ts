import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Logger,
  UseGuards,
  Controller,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ListMoviesResponse } from './dtos/list-movies-response.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MovieDto } from './dtos/movie.dto';
import { ApiNotFoundResponseDto } from 'src/common/api-responses/ApiNotFoundResponseDto';
import { MongodbIdValidationPipe } from './pipes/mongodbid-pipe';

@ApiTags('Movie')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MovieController {
  private logger = new Logger(MovieController.name);
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @Serialize(ListMoviesResponse)
  @ApiResponse({
    status: 200,
    description: 'List of movies along with pagination info.',
    type: ListMoviesResponse,
  })
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'limit', required: true })
  getMovies(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.movieService.listMovies(page, limit);
  }

  @Serialize(MovieDto)
  @Get(':movieId')
  @ApiParam({ name: 'movieId', description: 'id of movie' })
  @ApiResponse({ status: 200, type: MovieDto })
  @ApiNotFoundResponse({ type: ApiNotFoundResponseDto })
  async getMovieById(
    @Param('movieId', MongodbIdValidationPipe) movieId: string,
  ) {
    const movie = await this.movieService.getMovieById(movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${movieId}" does not exists.`);
    }

    return movie;
  }

  @Serialize(MovieDto)
  @Post()
  @ApiResponse({
    description: 'Newly created movie.',
    type: MovieDto,
    status: 201,
  })
  @ApiConflictResponse({
    description: 'Movie with given title already exists.',
  })
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    this.logger.log(
      `Creating new movie with payload = ${JSON.stringify(createMovieDto)}`,
    );
    return this.movieService.createMovie(createMovieDto);
  }

  @Serialize(MovieDto)
  @Put('/:movieId')
  @ApiParam({ name: 'movieId', description: 'Id of movie.' })
  @ApiResponse({ description: 'Updated created movie.', type: MovieDto })
  @ApiConflictResponse({
    description: 'Movie with given title already exists.',
  })
  updateMovie(
    @Body() updateMovieDto: UpdateMovieDto,
    @Param('movieId', MongodbIdValidationPipe)
    movieId: string,
  ) {
    this.logger.log(
      `Updating a movie with payload = ${JSON.stringify(updateMovieDto)}`,
    );
    return this.movieService.updateMovie(movieId, updateMovieDto);
  }
}
