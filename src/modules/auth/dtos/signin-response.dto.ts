import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignInResponseDto {
  @ApiProperty({ description: 'Access token for user' })
  @Expose()
  accessToken: string;
}
