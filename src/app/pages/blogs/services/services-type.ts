export interface Blog {
  id: number;
  order: number;
  video_type: string;
  video: string;
  views: number;
  is_featured: boolean;
  is_published: boolean;
  start_date: string;
  end_date: string | null;
  title: string;
  sub_title: string;
  post_type: string;
  slug: string;
  description: string;
  short_description: string;
  meta_title: string | null;
  meta_description: string;
  featured_images: string[];
  thumb: string;
  media_type: string;
  created_at: string;
  updated_at: string;
}

export class BlogModel {
  id: number | null;
  order: number | null;
  media_type: string | null;
  media_data: string | null;
  views: number | null;
  is_featured: 0 | 1;
  is_published: 0 | 1;
  title: string | null;
  sub_title: string | null;
  post_type: string | null;
  slug: string | null;
  description: string | null;
  short_description: string | null;
  meta_title: string | null;
  published_at: string | null;
  is_index: 0 | 1;
  meta_description: string | null;
  featured_images: string[] | null;
  category_id: number | null;
  thumb: string | null;

  constructor(editData?: BlogModel) {
    this.id = editData?.id || null;
    this.order = editData?.order ?? 1;
    this.media_data = editData?.media_data || null;
    this.views = editData?.views || null;
    this.is_featured = editData?.is_featured ?? 1;
    this.is_published = editData?.is_published ?? 1;
    this.published_at = editData?.published_at || null;
    this.post_type = editData?.post_type || 'gallery';
    this.title = editData?.title || null;
    this.sub_title = editData?.sub_title || null;
    this.slug = editData?.slug || null;
    this.category_id = editData?.category_id || null;
    this.is_index = editData?.is_index ?? 1;
    this.description = editData?.description || null;
    this.short_description = editData?.short_description || null;
    this.meta_title = editData?.meta_title || null;
    this.meta_description = editData?.meta_description || null;
    this.featured_images = editData?.featured_images || null;
    this.thumb = editData?.thumb || null;
    this.media_type = editData?.media_type || null;
  }
}
