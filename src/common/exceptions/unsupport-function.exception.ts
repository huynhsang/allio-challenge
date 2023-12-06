import { BadRequestException } from '@nestjs/common';
import { AllioQueryFunction } from '../constants/enum';

/**
 * The unsupported function exception
 */
export default class UnsupportedFunctionException extends BadRequestException {
  constructor(fn: AllioQueryFunction) {
    super(`The given ${fn} does not support in the query`);
  }
}
