import { from, of, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

describe('Name of the group', () => {
  it('should behave...', async () => {
    const stream$ = from([1, 2, 3]).pipe(
      map((n) => n * 2)
    );

    await expect(lastValueFrom(stream$))
      .resolves.toEqual(6);
  });

  it('should behave...', (done) => {
    const stream$ = of(6).pipe(
      map((n) => n * 2)
    );

    stream$.subscribe({
      next: val => {
        expect(val).toEqual(12);
      },
      complete: done
    });
  });
});