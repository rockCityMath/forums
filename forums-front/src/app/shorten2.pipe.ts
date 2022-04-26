import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten2'
})
export class Shorten2Pipe implements PipeTransform {

  transform(val:string , length:number):string {
    return val.length > length ? `${val.substring(8, 10)}-${val.substring(5, 7)}-${val.substring(0, 4)}` : val
  }

}
