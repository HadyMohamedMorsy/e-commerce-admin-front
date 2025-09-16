import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { environment } from '@env';
import { TranslateModule } from '@ngx-translate/core';
import {
  CustomOrder,
  OrderStatus,
} from '@pages/custom-orders/services/services-type';
import { DateFormatterPipe, ViewDialogComponent } from '@shared';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-view-custom-order',
  templateUrl: './view-custom-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, TranslateModule, ViewDialogComponent],
})
export default class ViewCustomOrderComponent {
  isShowDialog = model(false);
  customOrder = input.required<CustomOrder>();
  #dateFormatter = new DateFormatterPipe();
  domainUrl = environment.Domain_URL;

  list = computed<{ label: string; value: any; hasToolTip?: boolean }[]>(() => {
    return [
      {
        label: '#ID',
        value: this.customOrder()?.id,
      },
      {
        label: 'Total Price',
        value: this.customOrder()?.totalPrice
          ? `$${this.customOrder()?.totalPrice}`
          : '',
      },
      {
        label: 'Status',
        value: this.getStatusLabel(this.customOrder()?.status),
      },
      {
        label: 'Customer',
        value: this.customOrder()?.createdBy
          ? `${this.customOrder()?.createdBy.firstName} ${this.customOrder()
              ?.createdBy.lastName}`
          : '',
      },
      {
        label: 'Payment Method',
        value: this.customOrder()?.paymentMethod?.name || '',
      },
      {
        label: 'Books Count',
        value: this.customOrder()?.books ? this.customOrder()?.books.length : 0,
      },
      {
        label: 'Created At',
        value: this.#dateFormatter.transform(
          this.customOrder()?.createdAt,
          'relative',
        ),
      },
    ];
  });

  getStatusLabel(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING:
        return 'Pending';
      case OrderStatus.CONFIRMED:
        return 'Confirmed';
      case OrderStatus.PROCESSING:
        return 'Processing';
      case OrderStatus.SHIPPED:
        return 'Shipped';
      case OrderStatus.DELIVERED:
        return 'Delivered';
      case OrderStatus.CANCELLED:
        return 'Cancelled';
      default:
        return status || 'Unknown';
    }
  }

  getImageUrl(imagePath: string): string {
    console.log(this.customOrder().images);
    return this.domainUrl + imagePath;
  }

  previewImage(imagePath: string): void {
    window.open(this.getImageUrl(imagePath), '_blank');
  }

  async downloadImagesAsPDF(): Promise<void> {
    try {
      // Dynamic import for jsPDF
      const { default: jsPDF } = await import('jspdf');

      const pdf = new jsPDF();
      const images = this.customOrder().images || [];

      if (images.length === 0) {
        alert('No images to download');
        return;
      }

      // Process images one by one
      for (let i = 0; i < images.length; i++) {
        const imageUrl = this.getImageUrl(images[i]);

        try {
          // Fetch image data
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const imageData = await this.blobToBase64(blob);

          // Add image to PDF
          const img = new Image();
          img.onload = () => {
            const imgWidth = pdf.internal.pageSize.getWidth() - 20; // 10px margin on each side
            const imgHeight = (img.height * imgWidth) / img.width;

            // Add new page if not the first image
            if (i > 0) {
              pdf.addPage();
            }

            pdf.addImage(imageData, 'JPEG', 10, 10, imgWidth, imgHeight);

            // If this is the last image, save the PDF
            if (i === images.length - 1) {
              pdf.save(`book-creation-images-${Date.now()}.pdf`);
            }
          };
          img.src = imageData;
        } catch (error) {
          console.error(`Error processing image ${i + 1}:`, error);
        }
      }
    } catch (error) {
      console.error('Error creating PDF:', error);
      alert('Error creating PDF. Please try again.');
    }
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
