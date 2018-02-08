import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: Array<any>, propName: string, order: string): any {
    return value.sort((a, b) => {
      if (order === 'asc') {
        if (a[propName] > b[propName]) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (a[propName] > b[propName]) {
          return -1;
        } else {
          return 1;
        }
      }

    });
  }

}
