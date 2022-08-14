import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class JogadoresValidacaoParametrosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`value: ${value}, \n metadata: ${metadata.type}`);

    if (!value) {
      throw new BadRequestException(
        `O valor do paramentro precisa estar preenchido`,
      );
    }

    return value;
  }
}
