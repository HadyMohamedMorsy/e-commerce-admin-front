import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService, FieldBuilderService, SpinnerComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { finalize, map, tap } from 'rxjs';

@Component({
  selector: 'app-general-setting',
  standalone: true,
  templateUrl: './general-settings.component.html',
  imports: [
    DividerModule,
    TranslateModule,
    FormlyModule,
    SpinnerComponent,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ManageGlobalSettingsCuComponent {
  #fieldBuilder = inject(FieldBuilderService);
  #api = inject(ApiService);
  #destroyRef = inject(DestroyRef);

  generalSettingsForm = new FormGroup({});
  fields!: FormlyFieldConfig[];
  model: any = {};
  loadingScreen = signal(true);
  submitBtnLoading = signal(false);
  type = signal<'store' | 'update'>('store');

  ngOnInit() {
    return this.#api
      .request('post', `general-settings/index`, {})
      .pipe(
        map(({ data }) => data),
        tap((data) => {
          data && this.type.set('update');
          data && (this.model = { ...this.model, ...data });
          this.loadingScreen.set(false);
          this.fields = this.configureFields();
        }),
      )
      .subscribe();
  }

  configureFields(): FormlyFieldConfig[] {
    return [
      this.#fieldBuilder.fieldBuilder([
        {
          key: 'store_name',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'text',
            label: _('store name'),
          },
        },
        {
          key: 'store_email',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'email',
            label: _('store email'),
          },
        },
        {
          key: 'store_phone',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'text',
            label: _('store phone'),
          },
        },

        {
          key: 'default_currency',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'text',
            label: _('default currency'),
          },
        },
        {
          key: 'currency_symbol',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'text',
            label: _('currency symbol'),
          },
        },
        {
          key: 'tax_rate',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'number',
            label: _('tax rate (%)'),
            min: 0,
            max: 100,
            step: 0.01,
          },
        },
        {
          key: 'shipping_days',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'number',
            label: _('estimated shipping days'),
            min: 1,
          },
        },
        {
          key: 'gtm_container_id',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'text',
            label: _('gtm container id'),
          },
        },
        {
          key: 'google_analytics_id',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'text',
            label: _('google analytics id'),
          },
        },
        {
          key: 'omnisend_api_key',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'text',
            label: _('omnisend api key'),
          },
        },
        {
          key: 'omnisend_enabled',
          type: 'switch-field',
          className: 'col-12 md:col-4',
          props: {
            label: _('enable omnisend'),
          },
        },
        {
          key: 'facebook_url',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'url',
            label: _('facebook url'),
          },
        },
        {
          key: 'instagram_url',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'url',
            label: _('instagram url'),
          },
        },
        {
          key: 'twitter_url',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'url',
            label: _('twitter url'),
          },
        },
        {
          key: 'meta_title',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'text',
            label: _('default meta title'),
            maxLength: 60,
          },
        },

        {
          key: 'smtp_host',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'text',
            label: _('smtp host'),
          },
        },
        {
          key: 'smtp_port',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'number',
            label: _('smtp port'),
          },
        },
        {
          key: 'smtp_username',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'email',
            label: _('smtp username'),
          },
        },
        {
          key: 'smtp_password',
          type: 'password-field',
          className: 'col-12 md:col-4',
          props: {
            label: _('smtp password'),
          },
        },
        {
          key: 'smtp_encryption',
          type: 'input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'text',
            label: _('smtp encryption'),
          },
        },
        {
          key: 'maintenance_mode',
          type: 'switch-field',
          className: 'col-12 md:col-4',
          props: {
            label: _('enable maintenance mode'),
          },
        },
        {
          key: 'maintenance_message',
          type: 'textarea-field',
          className: 'col-12 ',
          props: {
            label: _('maintenance message'),
            rows: 3,
          },
        },
        {
          key: 'store_address',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            label: _('store address'),
            rows: 3,
          },
        },
        {
          key: 'meta_description',
          type: 'textarea-field',
          className: 'col-12',
          props: {
            label: _('default meta description'),
            rows: 3,
            maxLength: 160,
          },
        },
      ]),
    ];
  }

  update() {
    const method = this.type() === 'store' ? 'post' : 'put';
    if (this.generalSettingsForm.invalid) return;
    this.submitBtnLoading.set(true);
    this.#api
      .request(method, `general-settings/${this.type()}`, this.model)
      .pipe(
        finalize(() => this.submitBtnLoading.set(false)),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }
}
