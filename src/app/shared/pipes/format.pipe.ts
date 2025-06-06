import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatString',
})
export class FormatStringPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    return value
      .replace(/[_-]/g, ' ') // Replace _ or - with a space
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  }
}
