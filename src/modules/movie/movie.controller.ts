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
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListMoviesResponse } from './dtos/list-movies-response.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { TCurrentUser } from '../auth/typings/current-user.type';
import { MovieDto } from './dtos/movie.dto';

@ApiTags('Movie')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MovieController {
  private logger = new Logger(MovieController.name);
  constructor(private readonly movieService: MovieService) {}

  @Serialize(ListMoviesResponse)
  @Get()
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
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    return this.movieService.listMovies(currentUser, page, limit);
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
  createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    this.logger.log(
      `Creating new movie with payload = ${JSON.stringify(createMovieDto)}`,
    );
    return this.movieService.createMovie(createMovieDto, currentUser);
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
    @Param('movieId')
    movieId: string,
  ) {
    this.logger.log(
      `Updating a movie with payload = ${JSON.stringify(updateMovieDto)}`,
    );
    return this.movieService.updateMovie(movieId, updateMovieDto);
  }
}
