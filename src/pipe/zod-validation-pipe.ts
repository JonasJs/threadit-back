import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodError, type ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          errors: fromZodError(error),
          message: 'Validation failed',
          statusCode: 400,
        });
      }
      throw new BadRequestException('Validation failed');
    }

    return value;
  }
}
