import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyModule } from '@ngx-formly/core';
import { map } from 'rxjs';
import { FilterBaseComponent } from 'src/app/shared/components/filter-base/filter-base.component';

@Component({
  selector: 'app-products-filters', // Updated selector for products
  standalone: true,
  imports: [FormlyModule, NgClass, ReactiveFormsModule],
  templateUrl:
    '../../../shared/components/filter-base/filter-base.component.html', // Reused template
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersProductsComponent extends FilterBaseComponent {
  pageList$ = this.globalList.getGlobalList('products'); // Change to 'products'

  ngOnInit() {
    this.fields = [
      this.fieldBuilder.fieldBuilder(
        [
          {
            key: 'category', // Updated filter for product category
            type: 'select-field',
            className: 'md:col-2 col-12',
            props: {
              isNotPField: true,
              label: _('Category'), // Updated label
              options: this.pageList$.pipe(
                map(({ categories }) => [
                  { label: 'All', value: '' },
                  ...categories, // Assuming categories are provided
                ]),
              ),
            },
          },
          {
            key: 'price_range', // Filter for price range
            type: 'select-field',
            className: 'md:col-2 col-12',
            props: {
              isNotPField: true,
              label: _('Price Range'),
              options: this.pageList$.pipe(
                map(({ price_ranges }) => [
                  { label: 'All', value: '' },
                  ...price_ranges, // Assuming price ranges are provided
                ]),
              ),
            },
          },
          {
            key: 'availability', // Filter for availability status
            type: 'select-field',
            className: 'md:col-2 col-12',
            props: {
              isNotPField: true,
              label: _('Availability'),
              options: this.pageList$.pipe(
                map(({ availability_statuses }) => [
                  { label: 'All', value: '' },
                  ...availability_statuses, // Assuming statuses are provided
                ]),
              ),
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
