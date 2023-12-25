import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { TCurrentUser } from '../auth/typings/current-user.type';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto, currentUser: TCurrentUser) {
    const isMovieExists = await this.movieModel.countDocuments({
      title: createMovieDto.title,
    });

    if (isMovieExists) {
      throw new ConflictException(
        `Movie with title : "${createMovieDto.title}" already exists`,
      );
    }

    return this.movieModel.create({
      ...createMovieDto,
      createdBy: currentUser._id,
    });
  }

  async listMovies(
    currentUser: TCurrentUser,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    const totalMovies = await this.movieModel.countDocuments();

    if (skip > totalMovies) {
      throw new BadRequestException('Page does not exists');
    }

    const movies = await this.movieModel
      .find({ createdBy: currentUser._id })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      page,
      limit,
      movies,
      totalPages: Math.ceil(totalMovies / limit),
    };
  }

  async updateMovie(movieId: string, updateMovieDto: UpdateMovieDto) {
    const isMovieExists = await this.movieModel.countDocuments({
      title: updateMovieDto.title,
    });

    if (isMovieExists) {
      throw new ConflictException(
        `Movie with title : "${updateMovieDto.title}" already exists`,
      );
    }

    const updatedMovie = await this.movieModel.findOneAndUpdate(
      { _id: movieId },
      { $set: updateMovieDto },
      { new: true },
    );

    if (!updatedMovie) {
      throw new NotFoundException(
        `Movie with id: "${movieId}" doesn't exists.`,
      );
    }

    return updatedMovie;
  }
}
