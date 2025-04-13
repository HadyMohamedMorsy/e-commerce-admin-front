import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '@env';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-input-group',
  template: `
    <div [ngClass]="{ 'p-field': !props.isNotPField }">
      <p-inputgroup>
        <p-inputgroup-addon>
          @if (props.icon) {
            <i [class]="props.icon"></i>
          } @else {
            <span> {{ props.flagGroup }}</span>
          }
        </p-inputgroup-addon>
        <p-floatlabel variant="on">
          <input
            [type]="props.type || 'text'"
            pInputText
            [placeholder]="props.placeholder"
            [formControl]="formControl"
            [formlyAttributes]="field"
          />
          @if (props.label) {
            <label class="capitalize">
              {{ props.label }}
              @if (props.required && props.hideRequiredMarker !== true) {
                <span class="text-red">*</span>
              }
            </label>
          }
        </p-floatlabel>
      </p-inputgroup>

      @if (props.description) {
        <p class="mt-1 mb-0 font-medium text-xs text-primary capitalize">
          {{ props.description }}
        </p>
      }

      @if (showError && formControl.errors) {
        <small class="error-msg" role="alert">
          <formly-validation-message [field]="field" />
        </small>
      }
    </div>
  `,
  imports: [
    NgClass,
    FormlyModule,
    InputGroupAddonModule,
    FloatLabelModule,
    InputGroup,
    InputTextModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupComponent extends FieldType<FieldTypeConfig> {
  url = environment.API_URL;
}
