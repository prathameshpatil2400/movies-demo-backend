import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignUpResponseDto {
  @ApiProperty({ description: 'Id of user' })
  @Expose()
  _id: string;

  @ApiProperty({ description: 'Email' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'Access token for user' })
  @Expose()
  accessToken: string;

  @ApiProperty({ description: 'Date of creation' })
  @Expose()
  createdAt: string;

  @ApiProperty({ description: 'Date of updation' })
  @Expose()
  updatedAt: string;
}
