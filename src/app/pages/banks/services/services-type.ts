export interface Bank {
  id: number;
  account_name: string;
  account_number: string;
  featured_image: string;
  is_active: number;
  branch_name: string;
  bank_name: string;
  iban: string;
  swift_code: string;
  country_id: number;
  city_id: number;
  created_at: string;
  country: Location;
  city: Location;
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
  district_id: number | null;
  is_active: boolean;
  constructor(data?: BankModel) {
    this.id = data?.id || null;
    this.swift_code = data?.swift_code || null;
    this.iban = data?.iban || null;
    this.account_number = data?.account_number || null;
    this.country_id = data?.country_id || null;
    this.city_id = data?.city_id || null;
    this.district_id = data?.district_id || null;
    this.is_active = data?.is_active ?? false;
  }
}
