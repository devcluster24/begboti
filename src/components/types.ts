export interface NewsProps {
  id: number;
  headline: string;
  content: string;
  category: number;
  category_name: string;
  editor: number;
  editor_name: string;
  is_active: boolean;
  custom_location: string;
  location_type: string;
  location: number;
  division: string;
  district: string;
  upazila: string;
  trending_tags: string[];
  image: string;
  video: string;
  share_count: number;
  photo_editor: string;
  created_at: string;
  updated_at: string;
}

export interface AdsProps {
  id: number;
  image: string;
  link: string;
  height: number;
  width: number;
  file_type: string;
  page: string;
  section: string;
  order: number;
  video: string;
}

export interface NavbarProps {
  id: string;
  name: string;
  url: string;
  navbar_type: string;
}

export interface TrendingTagsProps {
  id: string;
  tag: string;
  is_latest: boolean;
}

export interface CategoryProps {
  id: number;
  name: string;
  description: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface BannerProps {
  id: string;
  image: string;
  link: string;
  height: number;
  width: number;
  order: number;
  page: string;
  video: string;
  file_type: string;
}
