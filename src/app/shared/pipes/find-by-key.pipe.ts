import { Pipe, PipeTransform } from '@angular/core';

/**
 * findByKey is a helper pipe that finds an object from given source using
 * the given key - value pairs
 */
@Pipe({ name: 'findByKey', pure: false })

export class FindByKeyPipe implements PipeTransform {
  /**
   * @param value A string or an array of strings to find from source
   * @param key Key of the object property to look for
   * @param source Array of objects to find from
   */
  transform(value: string | string[], key: string, source: any[]): any {
    // If the given value is an array of strings...
    if (Array.isArray(value)) {
      return value.map(item => source.find(sourceItem => sourceItem[key] === item));
    }

    // If the value is a string...
    return source.find(sourceItem => sourceItem[key] === value);
  }
}

/*
// html
  <ng-container *ngFor="let tag of (tags | findByKey:'id':tags); trackBy: trackByFn">
    <span>{{tag.title}}</span>
  </ng-container>

// ts
  trackByFn(index: number, item: any) {
    return item.id || index;
  }
*/
