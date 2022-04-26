import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten2'
})
export class Shorten2Pipe implements PipeTransform {
  num:any
  date:any
  month:any

  transform(val:string , length:number):string {
    this.num = val.substring(5,7)
    this.date = val.substring(8,9)

    if(this.num == '01'){this.month = 'January'}
    else if(this.num == '02'){this.month = 'February'}
    else if(this.num == '03'){this.month = 'March'}
    else if(this.num == '04'){this.month = 'April'}
    else if(this.num == '05'){this.month = 'May'}
    else if(this.num == '06'){this.month = 'June'}
    else if(this.num == '07'){this.month = 'July'}
    else if(this.num == '08'){this.month = 'August'}
    else if(this.num == '09'){this.month = 'September'}
    else if(this.num == '10'){this.month = 'October'}
    else if(this.num == '11'){this.month = 'November'}
    else if(this.num == '12'){this.month = 'December'}

    if(this.date == '0'){this.date = val.substring(9,10)}
    else{this.date = val.substring(8, 10)}

    return val.length > length ? `${this.month} ${this.date}, ${val.substring(0, 4)}` : val
  }

}
