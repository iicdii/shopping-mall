import isNumber from 'lodash/isNumber';
import numberFormat from 'underscore.string/numberFormat';

export default (number, decimals) => {
  if (!isNumber(number)) return number;

  return numberFormat(number, decimals);
};
