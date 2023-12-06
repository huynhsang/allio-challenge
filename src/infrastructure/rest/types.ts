import { DataType, OutputSize } from '../../common/constants/enum';

export type StockPriceQueryParameter = {
  interval?: string;
  adjusted?: boolean;
  extendedHours?: boolean;
  month?: string;
  outputSize?: OutputSize;
  dataType?: DataType;
};
