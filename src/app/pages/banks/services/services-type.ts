export interface Bank {
  id: number;
  account_name: string;
  account_number: string;
  featured_image: string;
  branch_name: string;
  bank_name: string;
  iban: string;
  swift_code: string;
  country_id: number;
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
  swift_code: string | null;
  iban: string | null;
  account_number: number | null;
  country_id: number | null;
  city_id: number | null;
  area_id: number | null;
  constructor(data?: BankModel) {
    this.id = data?.id || null;
    this.swift_code = data?.swift_code || null;
    this.iban = data?.iban || null;
    this.account_number = data?.account_number || null;
    this.country_id = data?.country_id || null;
    this.city_id = data?.city_id || null;
    this.area_id = data?.area_id || null;
  }
}
