import { Pipe, PipeTransform } from '@angular/core';
// transforms a string value representing a date into a localized date string.
@Pipe({name: 'toDate'})
export class ToDatePipe implements PipeTransform {
  transform(value: string): string {
    return new Date(value).toLocaleString();
  }
}
