# Backend Functions Summary for Car Purchase App

This document outlines all the backend interaction functions needed for each screen in the car purchase application.

## 📱 Screen-by-Screen Backend Functions

### 🔐 Authentication Screens

#### 1. **Login Screen** (`Src/app/index.tsx`)
**Purpose**: Initial phone number entry and OTP request

**Required Functions:**
- `sendOTPCode(phoneNumber)` - Sends OTP to user's phone
- `validatePhoneNumber(phoneNumber)` - Validates phone format
- `fetchAvailableCities()` - Gets available cities for app

**Data Flow:**
1. User enters phone number
2. Validate phone format
3. Send OTP via SMS
4. Navigate to verification screen

---

#### 2. **Verification Screen** (`Src/app/Verification.tsx`)
**Purpose**: OTP verification and user authentication

**Required Functions:**
- `verifyOTPCode(phoneNumber, otpCode)` - Verifies 4-digit OTP
- `storeAuthToken(token)` - Stores authentication token securely

**Data Flow:**
1. User enters 4-digit OTP
2. Verify OTP with backend
3. Store auth token if successful
4. Navigate to user details or main app

---

#### 3. **User Details Screen** (`Src/app/UserDetails.tsx`)
**Purpose**: Complete user registration with profile information

**Required Functions:**
- `registerUser(userData)` - Creates new user account
- `validateUserRegistration(userData)` - Validates form inputs
- `validateEmail(email)` - Validates email format

**Data Flow:**
1. User fills registration form
2. Validate all inputs (name, email, password)
3. Create user account in backend
4. Navigate to main app

---

### 🏠 Main App Screens

#### 4. **Home Screen** (`Src/app/tabs/index.tsx`)
**Purpose**: Main dashboard with featured content

**Required Functions:**
- `fetchHomeScreenData(city)` - Gets banners, cars, brands, news
- `fetchNotificationCount()` - Gets unread notifications count
- `fetchAvailableCities()` - Gets city list for selector

**Data Flow:**
1. Load home screen data based on selected city
2. Display featured cars, popular brands, news
3. Show notification badge count
4. Handle city selection changes

---

#### 5. **Buy Car Screen** (`Src/app/tabs/buy-car.tsx`)
**Purpose**: Browse and search for cars to purchase

**Required Functions:**
- `fetchCars(params)` - Gets filtered car listings
- `fetchFilterOptions()` - Gets available filter options
- `fetchCarDetails(carId)` - Gets detailed car information
- `fetchAvailableCities()` - Gets cities for location filter

**Data Flow:**
1. Load cars based on search/filter criteria
2. Apply filters (brand, price, location)
3. Handle search functionality
4. Navigate to car details on selection

---

#### 6. **Brands Screen** (`Src/app/tabs/Brands.tsx`)
**Purpose**: Browse car brands and their vehicles

**Required Functions:**
- `fetchAllBrands()` - Gets complete brand list
- `fetchPopularBrands()` - Gets trending brands
- `fetchCarsByBrand(brandId)` - Gets cars from specific brand

**Data Flow:**
1. Load all available car brands
2. Display popular brands prominently
3. Show brand-specific cars on selection
4. Handle brand filtering

---

#### 7. **Community Screen** (`Src/app/tabs/Community.tsx`)
**Purpose**: Social features and user-generated content

**Required Functions:**
- `fetchUserStories()` - Gets user story carousel data
- `fetchCommunityPosts(params)` - Gets community posts
- `createCommunityPost(postData)` - Creates new post
- `togglePostLike(postId)` - Likes/unlikes posts

**Data Flow:**
1. Load user stories for carousel
2. Load community posts with pagination
3. Handle post creation
4. Handle post interactions (like, comment)

---

#### 8. **Profile Screen** (`Src/app/tabs/Profile.tsx`)
**Purpose**: User profile management and settings

**Required Functions:**
- `fetchUserProfile()` - Gets user profile data
- `updateUserProfile(profileData)` - Updates profile information
- `fetchUserCars()` - Gets user's owned/driven cars
- `fetchLikedCars()` - Gets user's liked cars
- `fetchUserOrders()` - Gets user's purchase history
- `submitFeedback(feedbackData)` - Submits app feedback
- `logoutUser()` - Logs out user and clears session

**Data Flow:**
1. Load user profile and statistics
2. Display user's cars and orders
3. Handle profile updates
4. Manage app settings and feedback

---

## 🔧 Utility Functions

### Authentication & Security
- `getAuthToken()` - Retrieves stored auth token
- `removeAuthToken()` - Removes auth token on logout
- `handleApiError(error)` - Provides user-friendly error messages

### Data Validation
- `validatePhoneNumber(phoneNumber)` - Phone format validation
- `validateEmail(email)` - Email format validation
- `validateUserRegistration(userData)` - Registration form validation

---

## 📊 Data Processing Functions

### Backend Response Processing
Each API function should include:
1. **Data transformation** - Convert backend format to app format
2. **Error handling** - Graceful error management
3. **Loading states** - Show loading indicators during API calls
4. **Caching** - Cache frequently accessed data
5. **Pagination** - Handle large data sets efficiently

### Example Data Processing:
```typescript
// Process car data from backend
const processCarData = (backendCar: any): Car => ({
  id: backendCar.id,
  name: backendCar.name,
  brand: backendCar.brand,
  price: formatPrice(backendCar.price),
  image: backendCar.image_url,
  // ... other transformations
});
```

---

## 🚀 Implementation Notes

### API Endpoints Structure
```
/api/auth/
  ├── send-otp
  ├── verify-otp
  ├── register
  └── logout

/api/home/
  └── data?city={city}

/api/cars/
  ├── search
  ├── filters
  └── {carId}

/api/brands/
  ├── all
  ├── popular
  └── {brandId}/cars

/api/community/
  ├── stories
  ├── posts
  └── posts/{postId}/like

/api/user/
  ├── profile
  ├── cars
  ├── liked-cars
  ├── orders
  └── feedback
```

### Error Handling Strategy
1. **Network errors** - Show offline message
2. **Authentication errors** - Redirect to login
3. **Validation errors** - Show field-specific messages
4. **Server errors** - Show generic error with retry option

### Performance Considerations
1. **Image optimization** - Use CDN for car images
2. **Lazy loading** - Load content as needed
3. **Caching** - Cache static data (brands, cities)
4. **Pagination** - Load posts/cars in chunks

---

## 📝 TODO Implementation Checklist

### Phase 1: Authentication
- [ ] Implement OTP sending API
- [ ] Implement OTP verification API
- [ ] Implement user registration API
- [ ] Add secure token storage

### Phase 2: Core Features
- [ ] Implement home screen data API
- [ ] Implement car search and filtering API
- [ ] Implement brands API
- [ ] Add notification system

### Phase 3: Social Features
- [ ] Implement community posts API
- [ ] Implement user stories API
- [ ] Add post creation and interaction APIs

### Phase 4: User Management
- [ ] Implement user profile API
- [ ] Implement user cars and orders API
- [ ] Add feedback and settings APIs

### Phase 5: Optimization
- [ ] Add data caching
- [ ] Implement offline support
- [ ] Add analytics tracking
- [ ] Performance optimization

---

This comprehensive API structure ensures all screens have the necessary backend interactions for a fully functional car purchase application. 