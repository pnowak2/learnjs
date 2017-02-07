export class Profile {
  constructor(private first: string, private last: string) {

  }

  lastChanged() {
    return new Date();
  }
}