import { Section } from '../types';
import { topDeals } from './cars';
import { brands } from './brands';
import { upcoming } from './cars';
import { news } from './news';

// Sections data from index.tsx
export const sections: Section[] = [
  {
    type: 'main_header',
    data: [{ id: 'main_header_content' }], // Single item for the header section content
  },
  {
    type: 'banner_carousel',
    data: [{ id: 'banner_carousel_content' }], // Single item for the banner carousel
  },
  {
    type: 'horizontal_list_section',
    title: 'Top deal',
    data: [{ id: 'top_deals_list', items: topDeals, cardType: 'car' }], // Single item representing the FlatList
  },
  {
    type: 'horizontal_list_section',
    title: 'Popular brands',
    data: [{ id: 'brands_list', items: brands, cardType: 'brand' }], // Single item representing the FlatList
  },
  {
    type: 'horizontal_list_section',
    title: 'Upcoming',
    data: [{ id: 'upcoming_list', items: upcoming, cardType: 'car' }], // Single item representing the FlatList
  },
  {
    type: 'news_section',
    title: 'News',
    data: news.map(n => ({ ...n, id: n.title })), // Map news items to include an 'id' for keyExtractor
  },
]; 