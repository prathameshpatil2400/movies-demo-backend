import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup-input.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { TCurrentUser } from './typings/current-user.type';
import {
  ApiConflictResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SignUpResponseDto } from './dtos/signup-response.dto';
import { SignInResponseDto } from './dtos/signin-response.dto';
import { APIErrorResponseDto } from 'src/common/api-responses/ApiUnAuthorizedResponseDto';
import { SignInDto } from './dtos/signin-input.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @HttpCode(201)
  @Serialize(SignUpResponseDto)
  @ApiResponse({
    description: 'Newly created user with accessToken.',
    type: SignUpResponseDto,
    status: 201,
  })
  @ApiConflictResponse({
    description: 'User with given email already exists.',
    type: APIErrorResponseDto,
  })
  signUp(@Body() signUpDto: SignUpDto) {
    this.logger.log(
      `Creating new user with payload = ${JSON.stringify(signUpDto)}`,
    );
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Serialize(SignInResponseDto)
  @HttpCode(200)
  @Post('/sign-in')
  @ApiResponse({
    status: 200,
    description: 'Api access credentials.',
    type: SignInResponseDto,
  })
  @ApiUnauthorizedResponse({ type: APIErrorResponseDto })
  signIn(@Body() signIn: SignInDto, @CurrentUser() currentUser: TCurrentUser) {
    return this.authService.signIn(currentUser);
  }
}
