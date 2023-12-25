import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Validate,
  IsDefined,
  IsNotEmpty,
} from 'class-validator';
import { MatchPasswords } from 'src/decorators/password-matcher.decorator';

export class SignUpDto {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of user',
  })
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password of user',
  })
  password: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Validate(MatchPasswords, ['password'])
  @ApiProperty({
    description: 'Confirm password of user',
  })
  confirmPassword: string;
}
