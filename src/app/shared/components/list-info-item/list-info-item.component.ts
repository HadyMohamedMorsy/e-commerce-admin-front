import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ImageModule } from 'primeng/image';
import { TooltipModule } from 'primeng/tooltip';
import { FormatStringPipe } from '../../pipes';
import { FallbackPipe } from '../../pipes/fallback.pipe';

@Component({
  selector: 'app-list-info-item',
  imports: [
    TranslateModule,
    TooltipModule,
    ImageModule,
    FormatStringPipe,
    FallbackPipe,
  ],
  template: `
    <span class="item-label"> {{ label() | translate | formatString }}</span>
    @if (type() === 'image') {
      <p-image
        [src]="item()"
        [preview]="true"
        alt="Image"
        width="60"
        class="block"
      >
        <ng-template #indicator>
          <i class="pi pi-search"></i>
        </ng-template>
      </p-image>
    } @else if (!hasToolTip()) {
      <h6 class="text-sm text-700 font-semibold m-0">
        {{ item() | fallback }}
      </h6>
    } @else {
      <h6
        class="text-sm text-700 font-semibold m-0 line-clamp-1"
        pTooltip="{{ item() | fallback }}"
        tooltipPosition="top"
      >
        {{ item() | fallback }}
      </h6>
    }

    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListInfoComponent {
  label = input<string>('');
  item = input<string>();
  hasToolTip = input<boolean>(false);
  type = input<string>('');
}
