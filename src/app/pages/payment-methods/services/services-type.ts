export class PaymentMethodModel {
  id?: number | null;
  name: string | null;
  icon: string | null;
  slug: string | null;

  constructor(data?: PaymentMethodModel) {
    this.id = data?.id || null;
    this.name = data?.name || null;
    this.icon = data?.icon || null;
    this.slug = data?.slug || null;
  }
}

export interface PaymentMethod {
  id: number;
  name: string;
  icon: string;
  slug: string;
  createdAt: string;
}
