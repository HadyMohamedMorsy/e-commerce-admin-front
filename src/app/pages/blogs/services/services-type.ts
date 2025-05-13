import { User } from '@pages/users/services/services-type';

export interface Blog {
  id: number;
  order: number;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  startDate: string;
  endDate: string;
  title: string;
  subTitle: string;
  postType: string;
  slug: string;
  description: string;
  shortDescription: string;
  metaTitle: string | null;
  metaDescription: string;
  featuredImages: string[];
  thumb: string;
  video: string;
  mediaType: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
}

export class BlogModel {
  id: number | null;
  order: number | null;
  mediaType: string | null;
  video: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  title: string | null;
  subTitle: string | null;
  postType: string | null;
  slug: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  shortDescription: string | null;
  metaTitle: string | null;
  publishedAt: string | null;
  metaDescription: string | null;
  featuredImages: string[] | null;
  categoryIds: number | null;
  thumb: string | null;

  constructor(data?: BlogModel) {
    this.id = data?.id || null;
    this.order = data?.order ?? 1;
    this.video = data?.video || null;
    this.isFeatured = data?.isFeatured ?? true;
    this.isPublished = data?.isPublished ?? true;
    this.publishedAt = data?.publishedAt || null;
    this.postType = data?.postType || 'gallery';
    this.title = data?.title || null;
    this.subTitle = data?.subTitle || null;
    this.slug = data?.slug || null;
    this.startDate = data?.startDate || null;
    this.endDate = data?.endDate || null;
    this.categoryIds = data?.categoryIds || null;
    this.description = data?.description || null;
    this.shortDescription = data?.shortDescription || null;
    this.metaTitle = data?.metaTitle || null;
    this.metaDescription = data?.metaDescription || null;
    this.featuredImages = data?.featuredImages || null;
    this.thumb = data?.thumb || null;
    this.mediaType = data?.mediaType || null;
  }
}
