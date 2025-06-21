import SalesImage from '../assets/sales.png';
import HotImage from '../assets/hot.png';
import FeaturedImage from '../assets/featured.png';
import DiscountImage from '../assets/discount.png';
import { FilterOption } from '../types';

// Filter options data from buy-car.tsx
export const filterOptions: FilterOption[] = [
  { label: 'Sales', imageSource: SalesImage },
  { label: 'Hot', imageSource: HotImage },
  { label: 'Featured', imageSource: FeaturedImage },
  { label: 'Discount', imageSource: DiscountImage },
]; 