import { StringValidator } from "./validation";

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
      return s.length === 5;
  }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };