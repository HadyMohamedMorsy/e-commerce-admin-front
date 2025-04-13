import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FiltersData } from '@gService/global';
import { GlobalListService } from '@gService/global-list.service';
import { LangService } from '@gService/lang.service';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { FieldBuilderService } from '../../services';

@Component({
  selector: 'app-filter-base',
  imports: [FormlyModule, NgClass, ReactiveFormsModule],
  templateUrl: './filter-base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBaseComponent {
  displayFilters = input.required<boolean>();
  fieldBuilder = inject(FieldBuilderService);
  currentLang = inject(LangService).currentLanguage;
  globalList = inject(GlobalListService);

  filtersData = model<FiltersData | null>();
  model = {};
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields = [] as FormlyFieldConfig[];
}
