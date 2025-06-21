# Mockup Data

This folder contains all the mockup data used throughout the Car Purchase App. The data has been extracted from various screens and components to centralize and organize the mockup data.

## File Structure

### `cars.ts`
Contains all car-related mockup data:
- `topDeals`: Top deals car data from the home screen
- `upcoming`: Upcoming cars data from the home screen  
- `carData`: Car listing data from the buy-car screen

### `brands.ts`
Contains brand-related mockup data:
- `brands`: Brand data used in multiple screens
- `carBrands`: Alternative name for the same brand data

### `news.ts`
Contains news-related mockup data:
- `news`: News articles data from the home screen

### `community.ts`
Contains community-related mockup data:
- `userStories`: User stories data from the community screen
- `communityPosts`: Community posts data from the community screen

### `filters.ts`
Contains filter-related mockup data:
- `filterOptions`: Filter options data from the buy-car screen

### `banners.ts`
Contains banner-related mockup data:
- `banners`: Banner carousel data from the BannerCarousel component

### `sections.ts`
Contains section-related mockup data:
- `sections`: Section data for the home screen's SectionList

### `index.ts`
Main export file that exports all mockup data for easy importing.

## Usage

Import the mockup data in your components:

```typescript
// Import specific data
import { topDeals, brands, news } from '../mockup';

// Or import everything
import * as mockupData from '../mockup';
```

## Benefits

1. **Centralized Data Management**: All mockup data is in one place
2. **Easy Maintenance**: Update data in one location instead of multiple files
3. **Reusability**: Data can be easily reused across different components
4. **Type Safety**: All data is properly typed with TypeScript interfaces
5. **Clean Code**: Components are cleaner without inline data definitions

## Future Considerations

When integrating with a backend API, you can:
1. Replace the mockup data with API calls
2. Keep the same data structure for consistency
3. Use the mockup data as fallback during loading states
4. Gradually migrate from mockup to real data 