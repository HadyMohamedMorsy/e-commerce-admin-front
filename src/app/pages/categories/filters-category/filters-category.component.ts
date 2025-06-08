import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyModule } from '@ngx-formly/core';
import { map } from 'rxjs';
import { FilterBaseComponent } from 'src/app/shared/components/filter-base/filter-base.component';

@Component({
  selector: 'app-categories-filters',
  standalone: true,
  imports: [FormlyModule, NgClass, ReactiveFormsModule],
  templateUrl:
    '../../../shared/components/filter-base/filter-base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersCategoriesComponent extends FilterBaseComponent {
  pageList$ = this.globalList.getGlobalList('category');

  ngOnInit() {
    this.fields = [
      this.fieldBuilder.fieldBuilder(
        [
          {
            key: 'categoryType',
            type: 'select-field',
            className: 'md:col-4 col-12',
            props: {
              isFloatedLabel: true,
              label: _('select post type'),
              options: this.pageList$.pipe(
                map(({ categoryType }) => categoryType),
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
                this.sendModel();
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
                this.refreshModel();
              },
            },
          },
        ],
        'grid align-items-start',
      ),
    ];
  }
}
