import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  template: `
    <div [class]="'p-3 font-semibold ' + className()">
      <p class="text-sm capitalize">
        {{ getDate }}
        &copy;
        {{ 'Business platform powered by' | translate }}
        <a
          href="https://www.8worx.com/"
          target="_blank"
          title="8WORX,8XEgypt,8XUAE"
          class="text-blue-500 font-semibold"
          >8WORX</a
        >
      </p>
    </div>
  `,
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  get getDate() {
    return new Date().getFullYear();
  }
  className = input('text-right');
}
