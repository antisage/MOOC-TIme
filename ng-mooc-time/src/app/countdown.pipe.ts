import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const now = new Date();
    const target = new Date(value);
    return (-1 * Math.round((+now - +target)/(1000*60*60*24)));
  }

}
