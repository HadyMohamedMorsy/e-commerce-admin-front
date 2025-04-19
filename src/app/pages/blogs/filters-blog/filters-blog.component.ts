import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyModule } from '@ngx-formly/core';
import { of } from 'rxjs';
import { FilterBaseComponent } from 'src/app/shared/components/filter-base/filter-base.component';

@Component({
  selector: 'app-blogs-filters',
  standalone: true,
  imports: [FormlyModule, NgClass, ReactiveFormsModule],
  templateUrl:
    '../../../shared/components/filter-base/filter-base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersBlogsComponent extends FilterBaseComponent {
  pageList$ = of(1);

  ngOnInit() {
    this.fields = [
      this.fieldBuilder.fieldBuilder(
        [
          {
            key: 'category',
            type: 'select-field',
            className: 'md:col-3 col-12',
            props: {
              isNotPField: true,
              label: _('Category'),
              options: [],
            },
          },
          {
            key: 'post_type',
            type: 'select-field',
            className: 'col-12 md:col-6',
            props: {
              isFloatedLabel: true,
              label: _('select post type'),
              placeholder: _('select post type'),
              options: [
                {
                  label: this.translate.instant(_('article')),
                  value: 'article',
                },
                {
                  label: this.translate.instant(_('video')),
                  value: 'video',
                },
                {
                  label: this.translate.instant(_('gallery')),
                  value: 'gallery',
                },
              ],
            },
          },
          {
            key: 'media_type',
            type: 'select-field',
            props: {
              required: true,
              label: _('select article type'),
              placeholder: _('select article type'),
              options: [
                {
                  label: _('url'),
                  value: 'url',
                },
                {
                  label: _('iframe'),
                  value: 'iframe',
                },
              ],
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
