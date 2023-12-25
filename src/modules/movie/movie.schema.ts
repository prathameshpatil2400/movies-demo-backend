import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ collection: 'movies', timestamps: true })
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  publishingYear: number;

  @Prop({ required: true })
  poster: string;

  @Prop({ required: false })
  createdBy: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
