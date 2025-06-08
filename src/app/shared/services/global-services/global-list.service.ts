import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalListService {
  #cacheList = inject(CacheService);
  #api = inject(ApiService);

  getGlobalList(slug: string) {
    const cacheKey = `list/${slug}`;
    return this.#api
      .request('get', `lists/slug/${slug}`)
      .pipe(map(({ data }) => data));
  }
}
