import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FieldType, FieldTypeConfig, FormlyModule } from "@ngx-formly/core";
import { RatingModule } from "primeng/rating";

@Component({
  selector: 'formly-rating-field',
  template: `
    <div [ngClass]="{ 'p-field': !props.isNotPField }">
      @if (props.label) {
        <label class="capitalize">
          {{ props.label }}
          @if (props.required && props.hideRequiredMarker !== true) {
            <span class="text-red">*</span>
          }
        </label>
      }
      @if (props.description) {
        <p class="mb-3 text-xs">{{ props.description }}</p>
      }

      <p-rating
        [formControl]="formControl"
        [formlyAttributes]="field"
        [readonly]="props.readonly ?? false"
      ></p-rating>

      @if (showError && formControl.errors) {
        <small class="error-msg" role="alert">
          <formly-validation-message [field]="field" />
        </small>
      }
    </div>
  `,
  imports: [FormlyModule, NgClass, RatingModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent extends FieldType<FieldTypeConfig> {}
