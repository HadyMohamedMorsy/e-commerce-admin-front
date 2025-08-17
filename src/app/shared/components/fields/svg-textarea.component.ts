import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { SvgWrapperComponent } from '../svg-wrapper.component';

interface FillAttribute {
  id: string;
  originalValue: string;
  currentValue: string;
  element: string;
}

@Component({
  selector: 'formly-svg-textarea-field',
  template: `
    <div [ngClass]="{ 'p-field': !props.isNotPField }">
      <p-floatlabel variant="on">
        <textarea
          pTextarea
          class="w-full"
          [formControl]="formControl"
          [formlyAttributes]="field"
          [rows]="props.rows || 8"
          (input)="onSvgInput($event)"
          placeholder="Enter SVG code here..."
        ></textarea>

        @if (props.label) {
          <label class="capitalize" [ngClass]="props.labelClass">
            {{ props.label }}
            @if (props.required && props.hideRequiredMarker !== true) {
              <span class="text-red">*</span>
            }
          </label>
        }
      </p-floatlabel>

      @if (props.description) {
        <p class="mt-1 mb-0 font-medium text-xs text-primary capitalize">
          {{ props.description }} <i class="fas fa-circle-info text-sm"></i>
        </p>
      }

      <!-- Fill Color Editor Section -->
      @if (fillAttributes().length > 0) {
        <div class="mt-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
          <h4 class="text-sm font-medium text-blue-700 mb-3">
            <i class="fas fa-palette mr-2"></i>
            Fill Colors Found ({{ fillAttributes().length }}):
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            @for (fillAttr of fillAttributes(); track fillAttr.id) {
              <div
                class="flex items-center space-x-2 p-2 bg-white rounded border"
              >
                <div class="flex-shrink-0">
                  <p-colorPicker
                    [(ngModel)]="fillAttr.currentValue"
                    (onChange)="onColorChange(fillAttr)"
                    [format]="'hex'"
                  ></p-colorPicker>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-gray-700 truncate">
                    {{ fillAttr.element }}
                  </p>
                  <p class="text-xs text-gray-500 truncate">
                    Original: {{ fillAttr.originalValue }}
                  </p>
                </div>
                <button
                  pButton
                  type="button"
                  icon="fas fa-undo"
                  class="p-button-text p-button-sm"
                  (click)="resetColor(fillAttr)"
                  pTooltip="Reset to original color"
                ></button>
              </div>
            }
          </div>
          <div class="mt-3 flex space-x-2">
            <button
              pButton
              type="button"
              label="Apply All Changes"
              icon="fas fa-check"
              class="p-button-success p-button-sm"
              (click)="applyAllColorChanges()"
            ></button>
            <button
              pButton
              type="button"
              label="Reset All"
              icon="fas fa-undo"
              class="p-button-secondary p-button-sm"
              (click)="resetAllColors()"
            ></button>
          </div>
        </div>
      }

      <!-- SVG Preview Section -->
      @if (svgContent() && !svgError()) {
        <div class="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 class="text-sm font-medium text-gray-700 mb-2">SVG Preview:</h4>
          <app-svg-wrapper
            class="svg-preview-container border border-gray-300 rounded p-4 bg-white min-h-[200px] flex items-center justify-center"
            viewBox="0 0 30 30"
            width="100%"
            height="200"
            [groupContent]="svgContent()"
          ></app-svg-wrapper>
        </div>
      }

      @if (svgError()) {
        <div class="mt-2 p-3 border border-red-200 rounded-lg bg-red-50">
          <p class="text-sm text-red-600">
            <i class="fas fa-exclamation-triangle mr-1"></i>
            Invalid SVG: {{ svgError() }}
          </p>
        </div>
      }

      @if (showError && formControl.errors) {
        <small class="error-msg" role="alert">
          <formly-validation-message [field]="field" />
        </small>
      }
    </div>
  `,
  styles: [
    `
      .svg-preview-container {
        overflow: auto;
        max-height: 400px;
      }

      .svg-preview-container svg {
        max-width: 100%;
        max-height: 100%;
      }
    `,
  ],
  imports: [
    NgClass,
    TextareaModule,
    FloatLabel,
    FormlyModule,
    ReactiveFormsModule,
    FormsModule,
    ColorPickerModule,
    ButtonModule,
    TooltipModule,
    SvgWrapperComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgTextareaComponent extends FieldType<FieldTypeConfig> {
  svgContent = signal<SafeHtml>('');
  svgError = signal<string>('');
  fillAttributes = signal<FillAttribute[]>([]);
  #destroyRef = inject(DestroyRef);
  #sanitizer = inject(DomSanitizer);

  onSvgInput(event: any) {
    const svgCode = event.target.value;
    this.validateAndRenderSvg(svgCode);
    this.detectFillAttributes(svgCode);
  }

  private detectFillAttributes(svgCode: string) {
    if (!svgCode || svgCode.trim() === '') {
      this.fillAttributes.set([]);
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgCode, 'image/svg+xml');

      const fillElements: FillAttribute[] = [];
      const elementsWithFill = doc.querySelectorAll('[fill]');

      elementsWithFill.forEach((element, index) => {
        const fillValue = element.getAttribute('fill');
        if (fillValue && fillValue !== 'none') {
          fillElements.push({
            id: `fill-${index}`,
            originalValue: fillValue,
            currentValue: fillValue,
            element:
              element.tagName.toLowerCase() +
              (element.getAttribute('class')
                ? '.' + element.getAttribute('class')
                : ''),
          });
        }
      });

      this.fillAttributes.set(fillElements);
    } catch (error) {
      console.error('Error detecting fill attributes:', error);
      this.fillAttributes.set([]);
    }
  }

  onColorChange(fillAttr: FillAttribute) {
    // Update the SVG code with the new color
    this.updateSvgWithNewColor(fillAttr);
  }

  resetColor(fillAttr: FillAttribute) {
    fillAttr.currentValue = fillAttr.originalValue;
    this.updateSvgWithNewColor(fillAttr);
  }

  resetAllColors() {
    this.fillAttributes().forEach((fillAttr) => {
      fillAttr.currentValue = fillAttr.originalValue;
    });
    this.updateSvgWithAllColors();
  }

  applyAllColorChanges() {
    this.updateSvgWithAllColors();
  }

  private updateSvgWithNewColor(fillAttr: FillAttribute) {
    const currentSvgCode = this.formControl.value;
    if (!currentSvgCode) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(currentSvgCode, 'image/svg+xml');

      const elementsWithFill = doc.querySelectorAll('[fill]');
      let elementIndex = 0;

      elementsWithFill.forEach((element) => {
        const fillValue = element.getAttribute('fill');
        if (fillValue && fillValue !== 'none') {
          if (elementIndex === parseInt(fillAttr.id.split('-')[1])) {
            element.setAttribute('fill', fillAttr.currentValue);
          }
          elementIndex++;
        }
      });

      const serializer = new XMLSerializer();
      const updatedSvg = serializer.serializeToString(doc);

      this.formControl.setValue(updatedSvg);
      this.validateAndRenderSvg(updatedSvg);
    } catch (error) {
      console.error('Error updating SVG with new color:', error);
    }
  }

  private updateSvgWithAllColors() {
    const currentSvgCode = this.formControl.value;
    if (!currentSvgCode) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(currentSvgCode, 'image/svg+xml');

      const elementsWithFill = doc.querySelectorAll('[fill]');
      let elementIndex = 0;

      elementsWithFill.forEach((element) => {
        const fillValue = element.getAttribute('fill');
        if (fillValue && fillValue !== 'none') {
          const fillAttr = this.fillAttributes().find(
            (attr) => parseInt(attr.id.split('-')[1]) === elementIndex,
          );
          if (fillAttr) {
            element.setAttribute('fill', fillAttr.currentValue);
          }
          elementIndex++;
        }
      });

      const serializer = new XMLSerializer();
      const updatedSvg = serializer.serializeToString(doc);

      this.formControl.setValue(updatedSvg);
      this.validateAndRenderSvg(updatedSvg);
    } catch (error) {
      console.error('Error updating SVG with all colors:', error);
    }
  }

  private validateAndRenderSvg(svgCode: string) {
    if (!svgCode || svgCode.trim() === '') {
      this.svgContent.set(this.#sanitizer.bypassSecurityTrustHtml(''));
      this.svgError.set('');
      return;
    }

    try {
      // Basic SVG validation - check for SVG tags with attributes
      const hasSvgStart = /<svg[^>]*>/i.test(svgCode);
      const hasSvgEnd = /<\/svg>/i.test(svgCode);

      if (!hasSvgStart || !hasSvgEnd) {
        this.svgError.set('SVG must contain <svg> and </svg> tags');
        this.svgContent.set(this.#sanitizer.bypassSecurityTrustHtml(''));
        return;
      }

      // Check for potential security issues (basic check)
      if (svgCode.includes('<script') || svgCode.includes('javascript:')) {
        this.svgError.set('SVG cannot contain scripts for security reasons');
        this.svgContent.set(this.#sanitizer.bypassSecurityTrustHtml(''));
        return;
      }

      // Try to parse as XML to validate structure
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgCode, 'image/svg+xml');

      if (doc.querySelector('parsererror')) {
        this.svgError.set('Invalid SVG structure');
        this.svgContent.set(this.#sanitizer.bypassSecurityTrustHtml(''));
        return;
      }

      // Extract group content from the SVG
      const groupContent = this.extractGroupContent(svgCode);

      // If validation passes, render the group content
      this.svgContent.set(
        this.#sanitizer.bypassSecurityTrustHtml(groupContent),
      );
      this.svgError.set('');
    } catch (error) {
      this.svgError.set('Error parsing SVG: ' + (error as Error).message);
      this.svgContent.set(this.#sanitizer.bypassSecurityTrustHtml(''));
    }
  }

  private extractGroupContent(svgString: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const group = doc.querySelector('g');

    if (group) {
      return group.outerHTML;
    }

    // If no group found, return the content between <svg> tags
    const svgMatch = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
    return svgMatch ? svgMatch[1].trim() : '';
  }

  ngOnInit() {
    // Listen to form control value changes
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((value) => {
        this.validateAndRenderSvg(value);
        this.detectFillAttributes(value);
      });

    // Initialize with current value if exists
    if (this.formControl.value) {
      this.validateAndRenderSvg(this.formControl.value);
      this.detectFillAttributes(this.formControl.value);
    }
  }
}
