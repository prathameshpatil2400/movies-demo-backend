import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MongodbIdValidationPipe implements PipeTransform {
  async transform(value: any): Promise<any> {
    const regexPattern = /^[a-fA-F0-9]{24}$/;
    if (!regexPattern.test(value)) {
      throw new BadRequestException('Invalid id');
    }
    return value;
  }
}
