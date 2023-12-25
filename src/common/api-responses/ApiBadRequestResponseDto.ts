import { ApiProperty } from '@nestjs/swagger';

export class ApiBadRequestResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    examples: ['Invalid token!', 'Invalid credentials!'],
  })
  message: string;

  @ApiProperty({
    description: 'Error',
    example: 'Bad Request',
  })
  error: string;
}
