export interface Subscription {
  id: number;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export class SubscriptionModel {
  id: number | null;
  email: string | null;
  isActive: boolean;
  subscribedAt: string | null;
  unsubscribedAt: string | null;

  constructor(data?: SubscriptionModel) {
    this.id = data?.id || null;
    this.email = data?.email || null;
    this.isActive = data?.isActive ?? true;
    this.subscribedAt = data?.subscribedAt || null;
    this.unsubscribedAt = data?.unsubscribedAt || null;
  }
}
