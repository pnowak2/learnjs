import { StringValidator } from './validation';

const numberRegexp = /^[0-9]+$/;

class EmailValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

export { EmailValidator }
export { EmailValidator as ElectronicMailValidator }