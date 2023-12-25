import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of app user',
    example: 'pratham@gmail.com',
  })
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password of app user',
    example: '1234',
  })
  password: string;
}
