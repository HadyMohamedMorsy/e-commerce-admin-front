import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CuLocationDialogComponent } from '../dialog/cu/cu-location-dialog.component'; // Updated component name
import { ViewLocationComponent } from '../dialog/view/view-location.component';
import { FiltersLocationsComponent } from '../filters-location/filters-location.component';
import { Locations } from '../services/services-type';
@Component({
  selector: 'app-locations',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersLocationsComponent,
    TooltipModule,
    TranslateModule,
    ViewLocationComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './location.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LocationsComponent extends BaseIndexComponent<Locations> {
  // Updated class name

  ngOnInit() {
    this.dialogComponent = CuLocationDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'auth/users/user',
        delete: 'auth/users/user/delete',
      },
      navigateCreatePage: 'new-location',
      displayViewButton: true,
      indexTitle: this.#translate(_('Locations')),
      indexIcon: 'pi pi-users',
      createBtnLabel: this.#translate(_('Create Location')),
      indexTableKey: 'LOCATIONS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Email Address')),
          name: `email`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('created at')),
          name: 'created_at',
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
