export class WishlistModel {
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

  constructor(editData?: WishlistModel) {
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
