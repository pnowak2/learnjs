import { from, lastValueFrom, fromEvent } from 'rxjs';
import { toArray } from 'rxjs/operators';

describe('Convert Javascript sources to observable', () => {
  it('should convert array', () => {
    const arr = [1, 2, 3];
    const stream$ = from(arr);

    stream$.pipe(toArray()).subscribe(result => {
      expect(result).toEqual(arr);
    });
  }); 

  it('should convert Promise', async () => {
    const promise = new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(26);
      }, 10);
    });

    const promise$ = from(promise);

    await expect(lastValueFrom(promise$)).resolves.toEqual(26);
  });

  it('should convert dom event', async () => {
    // const div = document.createElement('div');
    // const click$ = fromEvent(div, 'click');

    // div.dispatchEvent(new Event('click', {}));

    // await expect(lastValueFrom(click$)).resolves.toBeDefined();
  }); 
});