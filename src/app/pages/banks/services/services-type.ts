export interface Bank {
  id: number;
  account_name: string;
  account_number: string;
  featured_image: string;
  branch_name: string;
  bank_name: string;
  iban: string;
  swift_code: string;
  city: Location;
  country: Location;
  area: Location;
  created_at: string;
}

interface Location {
  id: number;
  name: string;
  slug: string;
  shipment_price: number;
}

export class BankModel {
  id?: number | null;
  swiftCode: string | null;
  iban: string | null;
  accountName: string | null;
  branchName: string | null;
  bankName: string | null;
  accountNumber: string | null;
  featuredImage: string | null;
  countryId: number | null;
  regionId: number | null;
  cityId: number | null;
  areaId: number | null;
  constructor(data?: BankModel) {
    this.id = data?.id || null;
    this.swiftCode = data?.swiftCode || null;
    this.iban = data?.iban || null;
    this.accountName = data?.accountName || null;
    this.branchName = data?.branchName || null;
    this.bankName = data?.bankName || null;
    this.accountNumber = data?.accountNumber || null;
    this.featuredImage = data?.featuredImage || null;
    this.countryId = data?.countryId || null;
    this.regionId = data?.regionId || null;
    this.cityId = data?.cityId || null;
    this.areaId = data?.areaId || null;
  }
}
