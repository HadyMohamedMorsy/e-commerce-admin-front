import { inject, Injectable } from '@angular/core';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalListService {
  #cacheList = inject(CacheService);

  getGlobalList(slug: string, data?: { [key: string]: any }) {
    const cacheKey = `global-list-${slug}-${JSON.stringify(data)}`;
    return this.#cacheList.getData(
      `helpers/global-list`,
      'post',
      {
        name: slug,
        ...data,
      },
      cacheKey,
    );
  }
}
