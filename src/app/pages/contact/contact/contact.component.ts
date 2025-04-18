import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { BaseIndexComponent, TableWrapperComponent } from '@shared';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { ViewContactComponent } from '../dialog/view/view-contact.component';
import { FiltersContactsComponent } from '../filters-contact/filters-contact.component';
import { Contact } from '../services/services-type';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    TableWrapperComponent,
    ButtonModule,
    RouterLink,
    FiltersContactsComponent,
    TooltipModule,
    TranslateModule,
    ViewContactComponent,
    MenuModule,
    Dialog,
    TranslateModule,
  ],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactsComponent extends BaseIndexComponent<Contact> {
  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'auth/users/user',
        delete: 'auth/users/user/delete',
      },
      navigateCreatePage: 'new-contact',
      displayViewButton: true,
      indexTitle: this.#translate(_('Contacts')),
      indexIcon: 'pi pi-users',
      createBtnLabel: this.#translate(_('Create Contact')),
      indexTableKey: 'CONTACTS_KEY',
      columns: [
        {
          title: this.#translate(_('#ID')),
          name: `id`,
          searchable: false,
          orderable: false,
        },
        {
          title: this.#translate(_('Email Address')),
          name: `email`,
          searchable: true,
          orderable: false,
        },
        {
          title: this.#translate(_('created at')),
          name: 'created_at',
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
