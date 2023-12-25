import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dtos/signup-input.dto';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { TCurrentUser } from './typings/current-user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userService.findByEmail(signUpDto.email);

    if (existingUser) {
      throw new ConflictException(
        `User with email "${signUpDto.email}" already exists.`,
      );
    }

    const hashedPassword = await hash(signUpDto.password, 10);
    const user = (
      await this.userService.create({
        ...signUpDto,
        password: hashedPassword,
      })
    ).toObject();

    const userId = user._id.toString();
    const accessToken = sign({ userId }, this.configService.get('JWT_SECRET'), {
      expiresIn: '7d',
    });

    delete user['password'];

    return {
      ...user,
      accessToken: `Bearer ${accessToken}`,
    };
  }

  signIn(currentUser: TCurrentUser) {
    const signInPayload = { userId: currentUser._id };
    const accessToken = sign(
      signInPayload,
      this.configService.get('JWT_SECRET'),
      {
        expiresIn: '7d',
      },
    );

    return {
      accessToken: `Bearer ${accessToken}`,
    };
  }

  async validateUser(email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (!existingUser) return null;

    const isValidPassword = await this.validatePassword(
      password,
      existingUser.password,
    );

    if (!isValidPassword) {
      return null;
    }

    delete existingUser['password'];
    return existingUser.toObject();
  }

  async validatePassword(plainPassword: string, hashedPassword: string) {
    return compare(plainPassword, hashedPassword);
  }
}
