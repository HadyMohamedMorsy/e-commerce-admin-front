import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarRightFaqComponent } from '@layout/sidebar-right-faq/sidebar-right-faq.component';
import SidebarComponent from '@layout/sidebar/sidebar.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent, DateFormatterPipe } from '@shared';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LoadingBarModule,
    Toast,
    ButtonModule,
    SidebarComponent,
    SidebarRightFaqComponent,
    TranslateModule,
    ConfirmDialogComponent,
    ConfirmPopupModule,
  ],
  providers: [DatePipe, DateFormatterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
