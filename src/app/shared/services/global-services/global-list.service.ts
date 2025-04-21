import { inject, Injectable } from '@angular/core';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalListService {
  #cacheList = inject(CacheService);

  getGlobalList(slug: string) {
    const cacheKey = `list/${slug}`;
    return this.#cacheList.getData(`lists/slug/${slug}`, 'get', {}, cacheKey);
  }
}
