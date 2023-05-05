import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'szulDateFormat'
})
export class SzulDateFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let tzoffset = (new Date(value)).getTimezoneOffset() * 60000;
    let minOffSet = new Date(value).getTime() - tzoffset;
    let localISOTime = (new Date(minOffSet)).toISOString().replace('Z', '').replace('T', ' ');
    return localISOTime.split(' ')[0];
  }
}
