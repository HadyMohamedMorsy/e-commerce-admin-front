import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { Subscription } from '../services/services-type';

@Component({
  selector: 'app-subscription',
  imports: [
    TableWrapperComponent,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    TagModule,
    MenuModule,
  ],
  templateUrl: './subscription.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubscriptionComponent extends BaseIndexComponent<Subscription> {
  email = viewChild.required<TemplateRef<any>>('email');
  status = viewChild.required<TemplateRef<any>>('status');

  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'subscription/index',
        delete: 'subscription/delete',
      },
      displayCreateButton: false,
      displayUpdateButton: false,
      displayViewButton: false,
      displayFilterButton: false,
      indexTitle: this.#translate(_('Email Subscriptions')),
      indexIcon: 'pi pi-envelope',
      indexTableKey: 'SUBSCRIPTIONS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Email')),
          name: `email`,
          searchable: true,
          orderable: false,
          render: this.email(),
        },
        {
          title: this.#translate(_('Created At')),
          name: 'createdAt',
          searchable: false,
          orderable: false,
        },
      ],
    };

    this.initRolesUser();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
