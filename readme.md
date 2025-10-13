# Property Listing Page Assignment

## Assignment Overview

You are tasked with creating a **Property Listing Page** for a Bank's Auction system using the provided APIs. This assignment focuses on building a responsive, user-friendly interface that displays auction properties in a scrollable format with proper image handling and performance optimizations.

## Core Requirements

### 1. Property Listing Interface
- **Scrollable Property Grid**: Create a responsive grid layout displaying multiple properties
- **Property Cards**: Each property should be displayed in an attractive card format with:
  - Property title and location
  - Bank name
  - Reserve price
  - Area (sq ft)
  - Possession status
  - Auction start date
  - Application deadline
  - Property image (when available)

### 2. Image Handling
- **Conditional Display**: Only show property images when they are successfully loaded
- **Fallback Strategy**: Implement proper fallbacks for missing or broken images
- **Responsive Images**: Use appropriate image sizing for different screen sizes
- **Reference Images**: Use the provided images (`/images/image.png`, `/images/image2.png`) as design references for styling

### 3. API Integration
Utilize the following APIs extensively:

To test and understand APIs: **https://banksauctions.com/api/playground**

Base url: http://93.127.166.99:5001

#### A. Filter Options API (`GET /api/properties/filters`)
```javascript
// Get all available filter options
GET /api/properties/filters

// Filter by state
GET /api/properties/filters?state=Maharashtra

// Filter by state and city
GET /api/properties/filters?state=Maharashtra&city=Mumbai
```

**Response Structure:**
```json
{
  "success": true,
  "data": {
    "states": ["Maharashtra", "Gujarat", "Rajasthan"],
    "cities": ["Mumbai", "Pune", "Jaipur"],
    "localities": ["Andheri", "Bandra", "Malad"],
    "property_types": ["Residential", "Commercial", "Industrial"]
  },
  "filters_applied": {
    "state": "Maharashtra",
    "city": null,
    "query": null
  },
  "cached": true
}
```

#### B. Search Properties API (`GET /api/properties`)
```javascript
// Basic search
GET /api/properties

// Advanced search with filters
GET /api/properties?state=Maharashtra&city=Mumbai&property_type=Residential&budget_min=1000000&budget_max=5000000&page=1&limit=10

// Sort by auction date
GET /api/properties?sort_by=bn_auction_start_date&sort_order=DESC
```

**Response Structure:**
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "title": "Residential Property in Mumbai",
      "bank_name": "SBI",
      "reserve_price": 2500000,
      "area": "1200 sq ft",
      "possession": "Ready to move",
      "auction_start_date": "2025-10-15",
      "application_date": "2025-09-27"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pages": 15,
    "has_next": true,
    "has_prev": false
  },
  "filters_applied": {
    "state": "Maharashtra",
    "city": "Mumbai"
  }
}
```

#### C. Property Media API (`GET /api/properties/{id}/media`)
```javascript
// Get media for specific property
GET /api/properties/123/media

// Include thumbnails
GET /api/properties/123/media?include_thumbnails=true
```

**Response Structure:**
```json
{
  "success": true,
  "data": {
    "images": [
      {
        "filename": "property_front.jpg",
        "url": "/api/properties/123/media/property_front.jpg",
        "thumbnails": {
          "small": "/api/properties/123/media/property_front.jpg?size=150",
          "medium": "/api/properties/123/media/property_front.jpg?size=300"
        }
      }
    ],
    "videos": [],
    "total_count": 5
  }
}
```

## Technical Specifications

### 1. Frontend Framework
- Use **React** or **Next.js** for the application
- Ensure mobile-first approach

### 2. AI Tool Usage
- You may use AI tools as a coding assistant to help with:
  - Understanding API documentation and response structures
  - Debugging code and fixing errors
  - Learning new concepts or libraries
  - Generating boilerplate code or component structures
- However, you must write the core logic, implement the features, and ensure the final solution is your own work
- AI should be used as a tool to enhance your learning and productivity, not to complete the assignment for you

### 3. Performance Optimizations(optional)
- **Virtual Scrolling**: Implement virtual scrolling for large lists (recommended for 10+ properties)
- **Image Lazy Loading**: Load images only when they come into viewport
- **API Response Caching**: Cache filter options and frequently accessed data
- **Pagination Strategy**: Use cursor-based or offset-based pagination efficiently
- **Debounced Search**: Implement debounced search to reduce API calls

### 4. Error Handling(optional)
- **Network Errors**: Implement retry logic for failed API calls
- **Image Loading Errors**: Graceful fallback for broken images
- **Empty States**: Handle cases when no properties match filters
- **Loading States**: Show skeleton loaders during API calls

### 5. Advanced Features (Optional)
- **Infinite Scroll**: Implement infinite scroll with pagination
- **Filter Sidebar**: Create collapsible filter panel
- **Favorites System**: Allow users to bookmark properties

## API Playground Testing

Use the provided API playground extensively to:
1. **Test API Endpoints**: Verify all endpoints work correctly
2. **Understand Response Formats**: Analyze JSON structures
3. **Experiment with Parameters**: Test different filter combinations
4. **Check Performance**: Monitor response times and data sizes

## Evaluation Criteria

### 1. Functionality (40%)
- All APIs integrated correctly
- Property listing displays correctly
- Images load and handle errors properly
- Filtering and sorting work as expected

### 2. User Experience (30%)
- Responsive design across devices
- Smooth scrolling performance
- Intuitive navigation and interactions
- Loading states and error handling

### 3. Code Quality (20%)
- Clean, maintainable code structure
- Proper error handling and validation
- Performance optimizations implemented
- Well-documented code

### 4. Innovation (10%)
- Creative design elements
- Clever optimization techniques
- Additional features beyond requirements

## Submission Guidelines

1. **Code Structure**: Organize code in logical modules/components
2. **README File**: Include setup instructions and API usage
3. **Screenshots**: Provide screenshots of the working application
4. **Live Demo**: Deploy application

## GitHub Repository Submission

Once you complete your assignment:

### 1. Fork the Repository
- Visit: **https://github.com/ashishkhar/BanksAuctions_cards.git**
- Click the "Fork" button in the top-right corner
- Select your GitHub account as the destination

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/BanksAuctions_cards.git
cd BanksAuctions_cards
```

### 3. Create a Feature Branch
```bash
git checkout -b property-listing-assignment
```

### 4. Add Your Code
- Add all your source code files
- Include a comprehensive README.md with setup instructions
- Add screenshots of your working application

### 5. Commit and Push
```bash
git add .
git commit -m "Complete property listing page with React/Next.js implementation"
git push origin property-listing-assignment
```

### 6. Create a Pull Request
- Go to your fork on GitHub
- Click "Compare & pull request"
- Provide a clear title and description of your implementation
- Reference the assignment requirements in your PR description
- Submit the pull request

## Reference Images

### Design Reference 1
![Property Listing Design Reference 1](/images/image.png)

### Design Reference 2
![Property Listing Design Reference 2](/images/image2.jpeg)

## Component Structure

Your application should be organized with the following components:

### Core Components

#### 1. SearchForm Component
**Purpose**: Contains search inputs for filtering properties
**API Integration**: Uses `/api/properties/filters` for dropdown options
**Features**:
- Location/locality input field
- Budget range inputs (min/max)
- Property type dropdown
- Search form submission

#### 2. PropertyListingPage Component
**Purpose**: Main layout component for displaying search results
**Features**:
- Contains SearchForm and PropertyCard components
- Manages overall page state
- Handles API calls and data flow

#### 3. PropertyCard Component
**Purpose**: Displays summary information for a single property
**Data Source**: Uses `/api/properties` response data
**Display Fields**:
- Property title
- Bank name
- Reserve price
- Area (sq ft)
- Possession status
- Auction start date
- Application deadline
- Property image (when available)

#### 4. PaginationControls Component
**Purpose**: Handles page navigation and result limits
**Data Source**: Uses pagination object from `/api/properties` response
**Features**:
- Previous/Next buttons
- Page number indicators
- Results per page selector
- Total results counter

### File Structure

Your project should follow this organized structure:

```
property-listing/

├── images/
│   ├── image.png          # Reference image 1
│   └── image2.jpeg        # Reference image 2
├── src/
│   ├── components/
│   │   ├── SearchForm.jsx     # Search form component
│   │   ├── PropertyCard.jsx   # Individual property card
│   │   ├── PropertyListingPage.jsx  # Main page component
│   │   └── PaginationControls.jsx   # Pagination component
│   ├── services/
│   │   └── api.js             # API service functions
│   ├── hooks/
│   │   └── useProperties.js   # Custom hook for property data
│   ├── utils/
│   │   └── helpers.js         # Utility functions
│   ├── styles/
│   │   ├── global.css         # Global styles
│   │   └── components.css     # Component-specific styles
│   ├── App.jsx                # Main app component
│   └── index.js               # Entry point
├── package.json
├── README.md                  # Setup instructions
└── .gitignore
```

## Resources

- **API playground:** **https://banksauctions.com/api/playground**
- **GitHub Repository**: **https://github.com/ashishkhar/BanksAuctions_cards.git**



---

This assignment emphasizes practical API integration, performance optimization, and user experience design. Focus on creating a production-ready solution that handles real-world scenarios effectively.
