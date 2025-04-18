import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyModule } from '@ngx-formly/core';
import { map } from 'rxjs';
import { FilterBaseComponent } from 'src/app/shared/components/filter-base/filter-base.component';

@Component({
  selector: 'app-banks-filters',
  standalone: true,
  imports: [FormlyModule, NgClass, ReactiveFormsModule],
  templateUrl:
    '../../../shared/components/filter-base/filter-base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersBanksComponent extends FilterBaseComponent {
  pageList$ = this.globalList.getGlobalList('banks');

  ngOnInit() {
    this.fields = [
      this.fieldBuilder.fieldBuilder(
        [
          {
            key: 'bankName',
            type: 'select-field',
            className: 'md:col-2 col-12',
            props: {
              isNotPField: true,
              label: _('Bank Name'),
              options: this.pageList$.pipe(
                map(({ bankNames }) => [
                  { label: 'All', value: '' },
                  ...bankNames,
                ]),
              ),
            },
          },
          {
            key: 'branch',
            type: 'select-field',
            className: 'md:col-2 col-12',
            props: {
              isNotPField: true,
              label: _('Branch'),
              options: this.pageList$.pipe(
                map(({ branches }) => [
                  { label: 'All', value: '' },
                  ...branches,
                ]),
              ),
            },
          },
          {
            key: 'ifscCode',
            type: 'input-field',
            className: 'md:col-2 col-12',
            props: {
              isNotPField: true,
              label: _('IFSC Code'),
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
