import { ChangeDetectionStrategy, Component } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { ViewWishlistComponent } from '../dialog/view/view-wishlist.component';
import { Wishlist } from '../services/services-type';

@Component({
  selector: 'app-wishlists',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    ViewWishlistComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './wishlists.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WishlistsComponent extends BaseIndexComponent<Wishlist> {
  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'wishlists/index',
        delete: 'wishlists/delete',
      },
      navigateCreatePage: 'new-wishlist',
      displayViewButton: true,
      displayCreateButton: false,
      displayUpdateButton: false,
      indexTitle: this.#translate(_('Wishlists')),
      indexIcon: 'pi pi-list',
      createBtnLabel: this.#translate(_('Create Wishlist')),
      indexTableKey: 'WISHLISTS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Created At')),
          name: 'createdAt',
          searchable: false,
          orderable: false,
        },
      ],
    };
    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
