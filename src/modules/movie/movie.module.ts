import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongodbIdValidationPipe } from './pipes/mongodbid-pipe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  providers: [MovieService, MongodbIdValidationPipe],
  controllers: [MovieController],
})
export class MovieModule {}
