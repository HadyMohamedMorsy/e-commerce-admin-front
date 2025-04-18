export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at?: string; // Auto-generated timestamp
  updated_at?: string; // Auto-generated timestamp
}
