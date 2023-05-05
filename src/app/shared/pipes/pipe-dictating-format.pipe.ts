import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeDictatingFormat'
})
export class PipeDictatingFormatPipe implements PipeTransform {

  constMonthList: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June',
    'July','August','September','October','November','December'];

  transform(value: number, ...args: unknown[]): string {
    let tzoffset = (new Date(value)).getTimezoneOffset() * 60000;
    let minOffSet = new Date(value).getTime() - tzoffset;
    let localISOTime = (new Date(minOffSet)).toISOString().replace('Z', '').replace('T', ' ');
    let yearMonthDayFormat = localISOTime.split(' ')[0];
    let monthInString = this.constMonthList[(+(yearMonthDayFormat.split('-')[1]))-1];
    return yearMonthDayFormat.split('-')[0] + ' ' + monthInString;
  }
}
