export class ParamService {
  constructor(private phrase: string) {
    console.log('Param Service created with phrase', phrase);
  }

  getValue(): string {
    return this.phrase;
  }
}