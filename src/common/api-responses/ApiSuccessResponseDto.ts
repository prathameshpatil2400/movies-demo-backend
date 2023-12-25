import { ApiProperty } from '@nestjs/swagger';

export class ApiSuccessResponseDto {
  @ApiProperty({
    description: 'Success Response',
    examples: ['Movie deleted successfully.'],
  })
  message: string;
}
