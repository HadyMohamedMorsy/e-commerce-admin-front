import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyModule } from '@ngx-formly/core';
import { map } from 'rxjs';
import { FilterBaseComponent } from 'src/app/shared/components/filter-base/filter-base.component';

@Component({
  selector: 'app-shipments-filters',
  standalone: true,
  imports: [FormlyModule, NgClass, ReactiveFormsModule],
  templateUrl:
    '../../../shared/components/filter-base/filter-base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersShipmentsComponent extends FilterBaseComponent {
  pageList$ = this.globalList.getGlobalList('shipments');

  ngOnInit() {
    this.fields = [
      this.fieldBuilder.fieldBuilder(
        [
          {
            key: 'country',
            type: 'select-field',
            className: 'md:col-2 col-12',
            props: {
              isNotPField: true,
              label: _('Country'),
              options: this.pageList$.pipe(
                map(({ countries }) => [
                  { label: 'All', value: '' },
                  ...countries,
                ]),
              ),
            },
          },
          {
            key: 'state',
            type: 'select-field',
            className: 'md:col-2 col-12',
            props: {
              isNotPField: true,
              label: _('State/Province'),
              options: this.pageList$.pipe(
                map(({ states }) => [{ label: 'All', value: '' }, ...states]),
              ),
            },
          },
          {
            key: 'city',
            type: 'select-field',
            className: 'md:col-2 col-12',
            props: {
              isNotPField: true,
              label: _('City'),
              options: this.pageList$.pipe(
                map(({ cities }) => [{ label: 'All', value: '' }, ...cities]),
              ),
            },
          },
          {
            key: 'postal_code',
            type: 'input-field',
            className: 'md:col-2 col-12',
            props: {
              isNotPField: true,
              label: _('Postal Code'),
            },
          },
          {
            type: 'button-field',
            className: 'md:col-1 col-3',
            props: {
              type: 'button',
              buttonIcon: 'fas fa-search',
              isButtonRight: true,
              buttonClass: 'w-full bg-primary-900 height-field',
              onClick: () => {
                if (Object.keys(this.model).length === 0) return;
                this.filtersData.update((filters) => ({
                  ...filters,
                  ...this.model,
                }));
              },
            },
          },
          {
            type: 'button-field',
            className: 'md:col-1 col-3',
            props: {
              type: 'button',
              buttonIcon: 'fas fa-eraser',
              buttonClass: 'w-full p-button-outlined height-field',
              onClick: () => {
                const modelKeys = Object.keys(this.model);
                if (modelKeys.length === 0) return;
                this.options.resetModel?.();
                this.filtersData.update((oldFilters) => {
                  const updatedFilters = { ...oldFilters };
                  modelKeys.forEach((key) => delete updatedFilters[key]);
                  return updatedFilters;
                });
              },
            },
          },
        ],
        'grid align-items-start',
      ),
    ];
  }
}
