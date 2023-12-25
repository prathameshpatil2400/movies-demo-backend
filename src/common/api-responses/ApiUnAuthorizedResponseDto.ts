import { ApiProperty } from '@nestjs/swagger';

export class APIErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
  })
  message: string;

  @ApiProperty({ default: 'Short error message' })
  error: string;
}
