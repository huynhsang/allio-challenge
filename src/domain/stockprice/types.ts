import { DataType, OutputSize } from '../../common/constants/enum';

export type StockPriceParameter = {
  function: string;
  symbol: string;
  outputSize?: OutputSize;
  dataType?: DataType;
};
