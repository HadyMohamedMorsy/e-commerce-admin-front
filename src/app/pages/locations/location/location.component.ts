import {
  ChangeDetectionStrategy,
  Component,
  input,
  numberAttribute,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { filter, tap } from 'rxjs';
import { CuLocationDialogComponent } from '../dialog/cu/cu-location-dialog.component'; // Updated component name
import { ViewLocationComponent } from '../dialog/view/view-location.component';
import { Locations } from '../services/services-type';
@Component({
  selector: 'app-locations',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    RouterLink,
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
  name = viewChild.required<TemplateRef<any>>('name');
  locationId = input.required({ transform: numberAttribute });

  ngOnInit() {
    this.dialogComponent = CuLocationDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'location/index',
        delete: 'location/delete',
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
          title: this.#translate(_('name')),
          name: `name`,
          searchable: true,
          orderable: false,
          render: this.name(),
        },
        {
          title: this.#translate(_('created at')),
          name: 'createdAt',
          searchable: false,
          orderable: false,
        },
      ],
    };

    this.initRolesUser();
  }

  parentLocationId$ = toObservable(this.locationId).pipe(
    filter((locationId) => !!locationId),
    tap((locationId) => {
      this.globalFilterValue.set(null);
      this.filtersData.update((oldData) => ({
        ...oldData,
        search: { value: null, regex: false },
        parentId: locationId,
      }));
      const data = { parentId: locationId, method: 'create' };
      this.dialogConfig = { ...this.dialogConfig, data };
    }),
  );

  parentLocationIdReadonly = toSignal(this.parentLocationId$);

  override openUpdateRecordDialog(oldModel: any) {
    const model = { ...oldModel, parentId: this.locationId() };
    super.openUpdateRecordDialog(model);
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
