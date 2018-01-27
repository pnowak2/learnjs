import { Tuple } from './tuple';

export const StringPair = Tuple(String, String);

export const curry2 = function (fn) {
  return function (firstArg) {
    return function (secondArg) {
      return new StringPair(firstArg, secondArg);
    }
  }
}