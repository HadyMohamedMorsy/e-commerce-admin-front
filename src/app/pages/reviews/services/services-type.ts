export interface Review {
  id: number;
  title: string;
  is_approved: number;
  comment: string;
  created_at: string;
  rate: number;
  is_liked: 0 | 1;
  likes_count: number;
  creator_name: string;
  creator_image: string;
  media: string[];
  created_since: string;
}

export class ReviewModel {
  id?: number | null;
  comment: string | null;
  rate: number | null;
  reviewable_type: 'product' | 'blog';
  reviewable_id: number | null;
  media_ids: number[] | null;
  is_approved: number;

  constructor(data?: ReviewModel) {
    this.id = data?.id || null;
    this.comment = data?.comment || null;
    this.rate = data?.rate || null;
    this.reviewable_type = data?.reviewable_type || 'product';
    this.reviewable_id = data?.reviewable_id || null;
    this.media_ids = data?.media_ids || null;
    this.is_approved = data?.is_approved ?? 0;
  }
}
