import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FieldType, FieldTypeConfig, FormlyModule } from "@ngx-formly/core";
import { InputMaskModule } from "primeng/inputmask";

@Component({
  selector: 'formly-input-mask-field',
  template: `
    <div [ngClass]="{ 'p-field': !props.isNotPField }">
      @if (props.label) {
        <label>
          {{ props.label }}
          @if (props.required && props.hideRequiredMarker !== true) {
            <span class="text-red">*</span>
          }
        </label>
      }
      @if (props.description) {
        <p class="mb-3 text-xs">{{ props.description }}</p>
      }

      <p-inputMask
        [formlyAttributes]="field"
        [formControl]="formControl"
        [class.ng-dirty]="showError"
        [mask]="props.mask"
        [unmask]="props.unmask"
        [placeholder]="props.placeholder"
        [required]="props.required ?? false"
        [autoFocus]="props.autoFocus"
        [autocomplete]="props.autocomplete"
        [slotChar]="props.slotChar ?? '_'"
        [characterPattern]="props.characterPattern"
        [autoClear]="props.autoClear ?? false"
        [showClear]="props.showClear"
        [keepBuffer]="props.keepBuffer"
        (onBlur)="props.onBlur && props.onBlur(field, $event)"
        (onKeydown)="props.onKeydown && props.onKeydown(field, $event)"
      />

      @if (showError && formControl.errors) {
        <small class="error-msg" role="alert">
          <formly-validation-message [field]="field" />
        </small>
      }
    </div>
  `,
  styles: `
    ::ng-deep p-inputmask.ng-dirty.ng-invalid > .p-inputtext {
      border-color: #e24c4c !important;
    }
  `,
  imports: [FormlyModule,NgClass, InputMaskModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMaskComponent extends FieldType<FieldTypeConfig> {}
