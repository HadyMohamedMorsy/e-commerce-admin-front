export interface Address {
  id: number;
  user: any;
  title: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  city: string;
  postalCode: string;
  landmark?: string;
  phoneNumber: string;
  createdAt: Date;
  updated_at: Date;
}

export class AddressModel {
  id: string | null;
  title: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  country: number | null;
  city: number | null;
  area: number | null;
  postalCode: string | null;
  landmark: string | null;
  phoneNumber: string | null;
  constructor(data?: AddressModel) {
    this.id = data?.id || null;
    this.title = data?.title || null;
    this.addressLine1 = data?.addressLine1 || null;
    this.addressLine2 = data?.addressLine2 || null;
    this.country = data?.country || null;
    this.city = data?.city || null;
    this.area = data?.area || null;
    this.postalCode = data?.postalCode || null;
    this.landmark = data?.landmark || null;
    this.phoneNumber = data?.phoneNumber || null;
  }
}
