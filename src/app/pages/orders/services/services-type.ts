export interface BaseUser {
  id?: number;
  crm_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: number;
  role: {
    name_en: string;
  };
  type: 'user' | 'customer';
  start_validation_process: boolean;
  identifier_type: 'national_id' | 'passport_number';
  timezone: string;
  created_at: string;
  role_id: number;
  national_number: number;
  passport_number: number;
  is_suspended: boolean;
}

export interface Customer extends BaseUser {}
export interface UserList extends BaseUser {}

export class CustomerModel {
  id?: number | null;
  crm_id: number | null;
  parent: any;
  parent_id: number | null;
  is_owner: boolean;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string | null;
  phone: number | null;
  type: string;
  start_validation_process: boolean;
  identifier_type: 'national_id' | 'passport_number';
  timezone: string | null;
  role_id: number | null;
  national_number: number | null;
  passport_number: number | null;
  is_suspended: boolean;
  avatar: any;

  constructor(editData?: CustomerModel) {
    this.id = editData?.id || null;
    this.crm_id = editData?.crm_id || null;
    this.parent = editData?.parent
      ? {
          label: editData?.parent?.full_name,
          value: editData?.parent?.id,
        }
      : null;
    this.parent_id = editData?.parent_id || null;
    this.is_owner = editData?.is_owner || false;
    this.first_name = editData?.first_name || null;
    this.last_name = editData?.last_name || null;
    this.full_name = editData?.full_name || null;
    this.email = editData?.email || null;
    this.type = 'customer';
    this.phone = editData?.phone || null;
    this.start_validation_process = editData?.start_validation_process || false;
    this.identifier_type = editData?.identifier_type || 'national_id';
    this.national_number = editData?.national_number || null;
    this.passport_number = editData?.passport_number || null;
    this.timezone = editData?.timezone || 'Africa/Cairo';
    this.role_id = editData?.role_id || null;
    this.is_suspended = editData?.is_suspended ?? false;
    this.avatar = editData?.avatar ? [editData.avatar] : null;
  }
}
export class UserModel {
  id?: number | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string | null;
  type: string;
  phone: number | null;
  timezone: string | null;
  role_id: number | null;
  avatar: any;

  constructor(editData?: UserModel) {
    this.id = editData?.id || null;
    this.first_name = editData?.first_name || null;
    this.last_name = editData?.last_name || null;
    this.full_name = editData?.full_name || null;
    this.email = editData?.email || null;
    this.phone = editData?.phone || null;
    this.timezone = editData?.timezone || 'Africa/Cairo';
    this.type = 'user';
    this.role_id = editData?.role_id || null;
    this.avatar = editData?.avatar ? [editData.avatar] : null;
  }
}
export class ChangePasswordModel {
  id?: number | null;
  password: string | null;
  password_confirmation: string | null;

  constructor(editData?: ChangePasswordModel) {
    this.id = editData?.id || null;
    this.password = editData?.password || null;
    this.password_confirmation = editData?.password_confirmation || null;
  }
}
