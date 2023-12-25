import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dtos/signup-input.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  create(signUpDto: SignUpDto) {
    return this.userModel.create(signUpDto);
  }

  findById(userId: string) {
    return this.userModel.findById(userId).lean();
  }
}
