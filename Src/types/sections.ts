import { Car } from './car';
import { Brand } from './brand';
import { News } from './news';

// Define a base interface for section data to include the 'id' for keyExtractor
export interface SectionDataItem {
  id: string;
}

export interface HorizontalListItem extends SectionDataItem {
  items: Car[] | Brand[];
  cardType: 'car' | 'brand';
}

export interface NewsItem extends News, SectionDataItem {}

export interface Section {
  type: string;
  title?: string;
  data: SectionDataItem[] | HorizontalListItem[] | NewsItem[];
} 