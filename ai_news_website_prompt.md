# AI News Website Development Prompt

## Project Overview
Create a modern, responsive AI news website that fetches and displays the top 100 AI-related news articles using the NewsAPI and enhances them with AI-powered summaries using the Gemini API. The website should feature a professional design with theme toggle, topic categorization, and information pages.

## Technical Stack

### Frontend Framework
- **React 18+** with TypeScript
- **Vite** for build tooling and development server
- **React Router v6** for navigation
- **Tailwind CSS** for styling

### State Management & Data Fetching
- **React Query (TanStack Query)** for server state management
- **Zustand** or **Context API** for client state (theme)
- **Axios** for HTTP requests

### UI Components & Styling
- **Tailwind CSS** with custom configuration
- **Headless UI** for accessible components
- **Framer Motion** for animations
- **React Icons** for icon library
- **Lucide React** for additional icons

### Additional Libraries
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0",
    "framer-motion": "^10.16.0",
    "@headlessui/react": "^1.7.0",
    "lucide-react": "^0.300.0",
    "date-fns": "^2.30.0",
    "react-lazy-load-image-component": "^1.6.0",
    "use-debounce": "^10.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

## Project Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SearchBar.tsx
│   │   └── Layout.tsx
│   ├── articles/
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleGrid.tsx
│   │   ├── ArticleDetail.tsx
│   │   ├── ArticleSkeleton.tsx
│   │   └── SearchResults.tsx
│   ├── ui/
│   │   ├── ThemeToggle.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Tabs.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx
│   └── insights/
│       └── InsightsCard.tsx
├── pages/
│   ├── Home.tsx
│   ├── Search.tsx
│   ├── About.tsx
│   ├── Terms.tsx
│   ├── Privacy.tsx
│   └── Contact.tsx
├── services/
│   ├── newsService.ts
│   ├── geminiService.ts
│   └── api.ts
├── hooks/
│   ├── useArticles.ts
│   ├── useTopics.ts
│   ├── useTheme.ts
│   ├── useInsights.ts
│   └── useSearch.ts
├── store/
│   └── themeStore.ts
├── types/
│   ├── article.ts
│   └── topic.ts
├── utils/
│   ├── constants.ts
│   └── helpers.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Feature Specifications

### 1. Type Definitions

#### types/article.ts
```typescript
export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: string;
  aiSummary?: string;
  category?: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
```

#### types/topic.ts
```typescript
export interface TopicCategory {
  name: string;
  articles: Article[];
  icon: string;
  color: string;
  count: number;
}

export interface GeminiTopicResponse {
  topics: {
    name: string;
    articleIndices: number[];
  }[];
}
```

### 2. Environment Configuration

Create `.env` file:
```
VITE_NEWS_API_KEY=your_newsapi_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Create `.env.example`:
```
VITE_NEWS_API_KEY=your_newsapi_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 3. Services Layer

#### services/newsService.ts
Implement NewsService with:

**Function 1: `fetchAINews(pageSize = 100)`** returning `Promise<Article[]>`
- Base URL: https://newsapi.org/v2/everything
- Query parameters: 
  - q: "artificial intelligence OR machine learning OR AI"
  - language: en
  - sortBy: publishedAt
  - pageSize: 100
- Error handling with try-catch
- Response transformation to Article type

**Function 2: `searchNews(query, pageSize = 50)`** returning `Promise<Article[]>`
- Base URL: https://newsapi.org/v2/everything
- Query parameters:
  - q: {user's search query}
  - language: en
  - sortBy: relevancy (for search results)
  - pageSize: 50 (or user-defined)
- Filter for AI-related context (optional)
- Error handling
- Response transformation to Article type
- Debounced to avoid excessive API calls

#### services/geminiService.ts
Implement GeminiService with:

**Function 1: `summarizeArticle(title, description)`**
- Endpoint: Google Gemini API
- Prompt: "Summarize this AI news article in 2-3 concise sentences, highlighting the key insights: Title: {title}, Description: {description}. Provide a clear, informative summary suitable for quick reading."
- Return: Promise<string>

**Function 2: `getKeyInsights(articleTitles)`**
- Prompt: "Based on these recent AI news headlines, identify 3 key trends or themes: {first 20 titles}. Provide 3 bullet points of key insights."
- Return: Promise<string[]>

**Function 3: `categorizeArticles(articles)`**
- Prompt: "Analyze these 100 AI news article titles and descriptions. Categorize them into exactly 5 distinct topics/themes. For each topic, provide: 1) A concise topic name (2-3 words), 2) A list of article indices that belong to this topic. Choose topics that best represent the major themes in AI news. Return the response in JSON format: {\"topics\": [{\"name\": \"topic name\", \"articleIndices\": [0, 5, 12, ...]}, ...]}"
- Parse JSON response
- Return: Promise<GeminiTopicResponse>

### 4. State Management

#### store/themeStore.ts (using Zustand)
```typescript
interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}
```
- Store theme preference in localStorage
- Listen to system theme changes
- Provide resolved theme (actual light/dark)

### 5. Custom Hooks

#### hooks/useArticles.ts
- Use React Query to fetch articles
- Cache results for 5 minutes
- Handle loading and error states
- Automatic refetch on window focus

#### hooks/useSearch.ts
- Use React Query with search query as key
- Debounce search input (500ms) using use-debounce
- Only trigger search when query length > 2 characters
- Cache search results per query
- Handle loading and error states
- Clear results when query is empty
- Return: `{ searchResults, isSearching, searchError, clearSearch }`

#### hooks/useTopics.ts
- Fetch articles first
- Then categorize with Gemini
- Return TopicCategory[] with articles distributed
- Handle loading states separately

#### hooks/useTheme.ts
- Access theme store
- Provide toggle functions
- Handle system theme detection
- Apply theme class to document root

### 6. Layout Components

#### components/layout/SearchBar.tsx
Create powerful search component with:

**Visual Design:**
- Search icon (left side of input)
- Input field with placeholder: "Search AI news..."
- Clear button (X) when text is entered
- Loading spinner when searching
- Keyboard shortcut hint (⌘K or Ctrl+K)

**Features:**
- Auto-focus on keyboard shortcut (Cmd/Ctrl + K)
- Debounced input (500ms delay)
- Real-time search suggestions (optional)
- Recent searches (stored in localStorage)
- Search history dropdown
- Minimum 3 characters to trigger search
- Clear button to reset search
- Responsive design (full width on mobile, fixed width on desktop)

**Search Overlay/Modal (optional):**
- Overlay background when search is active
- Click outside to close
- ESC key to close
- Display search results in overlay
- Quick preview of articles

**Placement:**
- Desktop: Center of header between logo and theme toggle
- Mobile: Expandable search icon, opens full-screen search

**States:**
- Default: Collapsed icon (mobile) or visible bar (desktop)
- Focused: Expanded, highlighted border
- Searching: Loading spinner visible
- Has Results: Show results count
- No Results: Show "No results found" message
- Error: Show error message with retry

#### components/layout/Header.tsx
#### components/layout/Header.tsx
Create responsive header with:
- Logo/brand (left)
- Search bar (center) - SearchBar component
- Navigation menu (right side):
  - Home
  - About
  - Terms
  - Privacy
  - Contact
- Theme toggle slider (far right)
- Mobile hamburger menu (< 768px)
- Sticky header with backdrop blur
- Shadow on scroll

**Desktop Design:**
```
[Logo]  [🔍 Search...]  [Home] [About] [Terms] [Privacy] [Contact]  [Theme Toggle]
```

**Mobile Design:**
```
[Logo]  [🔍]                                    [Hamburger Menu]
```
- Search icon expands to full-screen search overlay

#### components/layout/Sidebar.tsx (Mobile Menu)
Create slide-out sidebar for mobile:
- Overlay background
- Slide animation from right
- Navigation links (vertical)
- Theme toggle at bottom
- Close button

#### components/layout/Footer.tsx
Create footer with:
- 3 columns (desktop), stacked (mobile):
  - Column 1: About & Description
  - Column 2: Quick Links (Home, About, Terms, Privacy, Contact)
  - Column 3: Connect (Social media, Email)
- Copyright notice at bottom
- Divider line above copyright
- Responsive grid layout

### 7. UI Components

#### components/ui/ThemeToggle.tsx
Create theme toggle slider with:
- Three states: Light | System | Dark
- Visual design:
  - Horizontal slider track
  - Animated thumb/indicator
  - Icons: Sun (light), Monitor (system), Moon (dark)
  - Smooth transitions
  - Current state highlighted
- Click to cycle through states
- Keyboard accessible (Tab, Enter, Space)
- ARIA labels for accessibility
- Tailwind CSS animations

**Visual Structure:**
```
[☀️ Light] [🖥️ System] [🌙 Dark]
   ↑ Active state highlighted
```

#### components/ui/Tabs.tsx
Create accessible tab component with:
- Tab list with horizontal scroll
- Active tab indicator (underline animation)
- Click to switch tabs
- Keyboard navigation (Arrow keys)
- ARIA attributes
- Responsive (stack on very small screens)

#### components/ui/Card.tsx
Reusable card component with:
- Variants: elevated, outlined
- Padding options
- Hover effects
- Tailwind styling

#### components/ui/LoadingSpinner.tsx
Create loading spinner:
- Animated SVG or CSS spinner
- Size variants (sm, md, lg)
- Theme-aware colors

### 8. Article Components

#### components/articles/SearchResults.tsx
Create search results component with:
- Results header:
  - Search query displayed: "Results for '{query}'"
  - Results count: "Found {count} articles"
  - Clear search button
  - Sort options: Relevancy (default), Date (newest first), Date (oldest first)
- Search results grid (same as ArticleGrid)
- Empty state when no results:
  - Icon: Search with X
  - Message: "No articles found for '{query}'"
  - Suggestions: "Try different keywords" or "Search for broader terms"
  - Button: "Clear Search" or "Browse All Articles"
- Loading state with skeletons
- Error state with retry
- Pagination if many results (20 per page)
- Highlight search terms in article titles/descriptions (optional)

#### components/articles/ArticleCard.tsx
Create article card with:
- Image section (if available):
  - Aspect ratio 16:9
  - Lazy loading with placeholder
  - Fallback icon if no image
  - Gradient overlay on bottom
- Content section:
  - Category badge (top, colored)
  - Source name (small, muted)
  - Published date (formatted: "MMM dd, yyyy")
  - Title (bold, 2 lines max, ellipsis)
  - Description (3 lines max, ellipsis)
  - AI summary section (expandable):
    - Icon: Sparkles/Star
    - Background: light blue (light theme), dark blue (dark theme)
    - "AI Summary" label
    - Summary text (toggle expand/collapse)
- Card interactions:
  - Hover effect (lift, shadow)
  - Click to view full article (open in new tab)
- Responsive: Full width mobile, grid desktop

#### components/articles/ArticleGrid.tsx
Create responsive grid:
- Desktop: 3 columns
- Tablet: 2 columns  
- Mobile: 1 column
- Gap: 1.5rem
- Auto-fit layout

#### components/articles/ArticleSkeleton.tsx
Create loading skeleton:
- Shimmer animation
- Match ArticleCard layout
- Show while loading

#### components/insights/InsightsCard.tsx
Create insights display:
- Card container with icon (lightbulb/brain)
- Title: "AI Trends & Insights"
- List of 3-5 insights
- Each insight on separate line
- Special styling (border, background)
- Expandable on mobile

### 9. Pages

#### pages/Search.tsx
Create dedicated search page with:

**Hero Section:**
- Large search bar (centered)
- Heading: "Search AI News"
- Subheading: "Discover articles on any AI topic"

**Search Interface:**
- Prominent search input
- Search suggestions as user types (optional)
- Popular searches / trending topics (chips):
  - "ChatGPT"
  - "Machine Learning"
  - "Neural Networks"
  - "AI Ethics"
  - "OpenAI"
  - etc.
- Click on chip to auto-search

**Results Section:**
- Show when user has searched
- Use SearchResults component
- Filter sidebar (optional):
  - Date range
  - Source filter
  - Category filter
- Sort dropdown (Relevancy, Date)

**Empty State (no search performed):**
- Search tips:
  - "Try searching for specific AI topics"
  - "Examples: GPT-4, computer vision, reinforcement learning"
- Recent searches (if any, from localStorage)
- Trending topics

**URL Integration:**
- Search query in URL: `/search?q=machine+learning`
- Shareable search URLs
- Back button works correctly

**Features:**
- Real-time search as user types (debounced)
- Keyboard navigation (up/down arrows for suggestions)
- Enter to search
- Clear search functionality
- Search history (localStorage)
- Accessible search interface

#### pages/Home.tsx
#### pages/Home.tsx
Main page with:

**Hero Section:**
- Large heading: "AI News Hub"
- Subheading: "Stay Updated with Latest AI Developments"
- Search bar (prominent, centered)
- Gradient background
- CTA: "Explore News" (scroll to articles)

**Quick Search Section (optional):**
- Trending searches as clickable chips
- Popular topics shortcuts

**Insights Section:**
- Full-width insights card
- Display AI-generated trends
- Loading skeleton while fetching

**Topics/Tabs Section:**
- Tab navigation:
  - "All News" (100 articles)
  - 5 AI-generated topic tabs with counts
- Active tab content:
  - Topic-specific insights (if available)
  - Article count
  - Article grid
  - Load more button (pagination if >20 articles)
- Loading states
- Error states with retry

**Features:**
- Infinite scroll or pagination
- Pull-to-refresh (mobile)
- Smooth tab transitions
- URL query params for active tab
- Scroll restoration

#### pages/About.tsx
Create about page with:
- Hero section with title
- Content sections:
  - **What We Do**
    - Description of the platform
    - Mission statement
  - **Features** (grid):
    - 📰 100+ Daily Articles
    - 🤖 AI-Powered Summaries
    - 📊 Smart Categorization
    - 🎨 Beautiful Design
    - 🌓 Dark Mode Support
    - ⚡ Lightning Fast
  - **Technology Stack**
    - Powered by NewsAPI
    - AI by Google Gemini
    - Built with React & TypeScript
  - **Our Commitment**
    - Quality content
    - User privacy
    - Continuous improvement
- Professional typography and spacing
- Images/illustrations (optional)

#### pages/Terms.tsx
Create terms page with:
- Page title: "Terms & Conditions"
- Last updated date
- Sections:
  1. Acceptance of Terms
  2. Use of Service
  3. User Responsibilities
  4. Content and Intellectual Property
  5. Third-Party Services (NewsAPI, Gemini)
  6. Disclaimer of Warranties
  7. Limitation of Liability
  8. Changes to Terms
  9. Governing Law
  10. Contact Information
- Table of contents (sticky sidebar on desktop)
- Professional legal formatting
- Anchor links to sections

#### pages/Privacy.tsx
Create privacy policy page with:
- Page title: "Privacy Policy"
- Last updated date
- Sections:
  1. Information Collection
     - Theme preferences (localStorage)
     - No personal data collection
     - No cookies for tracking
  2. How We Use Information
  3. Data Storage (Local only)
  4. Third-Party Services
     - NewsAPI (link to their privacy policy)
     - Google Gemini (link to their privacy policy)
  5. Data Security
  6. Your Rights
  7. Children's Privacy
  8. Changes to Policy
  9. Contact Us
- Clickable external links
- Clear, transparent language
- Table of contents

#### pages/Contact.tsx
Create contact page with:
- Hero section with title and description
- Contact options (card grid):
  
  **Email Card:**
  - Icon: Mail
  - Title: "Email Us"
  - Email: support@ainewshub.com
  - Description: "Get in touch via email"
  - Button: Opens email client
  
  **GitHub Card:**
  - Icon: GitHub
  - Title: "Open Source"
  - Link to repository
  - Button: "View on GitHub"
  
  **Feedback Card:**
  - Icon: MessageSquare
  - Title: "Send Feedback"
  - Description: "Help us improve"
  - Button: Opens feedback form/email
  
  **Twitter Card:**
  - Icon: Twitter
  - Title: "Follow Us"
  - Handle: @ainewshub
  - Button: Opens Twitter

- Response time note
- FAQ section (optional)
- Interactive hover effects

### 10. Routing Configuration

#### App.tsx
Set up React Router:
```typescript
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="search" element={<Search />} />
    <Route path="about" element={<About />} />
    <Route path="terms" element={<Terms />} />
    <Route path="privacy" element={<Privacy />} />
    <Route path="contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
```

- Shared Layout wrapper
- Nested routes
- Search page with query params support
- 404 page
- Smooth page transitions with Framer Motion

### 11. Styling & Design System

#### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        // Add custom colors for topics
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in',
        'shimmer': 'shimmer 2s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

#### Design Tokens
- **Typography:**
  - Headings: font-bold, tracking-tight
  - Body: font-normal, leading-relaxed
  - Small: text-sm, text-gray-600 dark:text-gray-400

- **Spacing:**
  - Container: max-w-7xl, mx-auto, px-4
  - Section gaps: py-12 md:py-16
  - Component gaps: space-y-6

- **Colors:**
  - Background: bg-white dark:bg-gray-900
  - Surface: bg-gray-50 dark:bg-gray-800
  - Text: text-gray-900 dark:text-gray-100
  - Muted: text-gray-600 dark:text-gray-400
  - Accent: primary colors

- **Shadows:**
  - Cards: shadow-md hover:shadow-lg
  - Header: shadow-sm
  - Elevated: shadow-xl

- **Transitions:**
  - Default: transition-all duration-200
  - Theme: transition-colors duration-300

### 12. Responsive Design Breakpoints

```
Mobile:    < 640px   (1 column, hamburger menu, stacked layout)
Tablet:    640-1024px (2 columns, some horizontal layouts)
Desktop:   > 1024px   (3 columns, full navigation, side-by-side)
Wide:      > 1280px   (max-width container, optimized spacing)
```

### 13. Accessibility Requirements

- Semantic HTML5 elements (header, nav, main, article, footer)
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators visible
- Color contrast ratios WCAG AA compliant
- Alt text for all images
- Skip to content link
- Screen reader friendly
- Reduced motion support (prefers-reduced-motion)

### 14. Performance Optimizations

- Code splitting (React.lazy)
- Image lazy loading
- API response caching (React Query)
- Debounced search (if implemented)
- Memoized components (React.memo)
- Virtual scrolling for large lists (optional: react-window)
- Optimized bundle size
- PWA support (optional):
  - Service worker
  - Offline fallback
  - App manifest

### 15. SEO & Meta Tags

For each page, include:
```html
<head>
  <title>Page Title | AI News Hub</title>
  <meta name="description" content="Page description" />
  <meta property="og:title" content="Page Title" />
  <meta property="og:description" content="Page description" />
  <meta property="og:image" content="image-url" />
  <meta name="twitter:card" content="summary_large_image" />
</head>
```

Use React Helmet or react-helmet-async

### 16. Error Handling

- Global error boundary
- Network error messages
- API error handling with user-friendly messages
- Retry mechanisms
- 404 page for invalid routes
- Loading states for async operations
- Empty states for no data

## Implementation Details

### Theme Toggle Implementation

**Visual Design:**
```html
<div class="inline-flex bg-gray-200 dark:bg-gray-700 rounded-full p-1">
  <button class="px-4 py-2 rounded-full transition-all">
    <Sun /> Light
  </button>
  <button class="px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow">
    <Monitor /> System
  </button>
  <button class="px-4 py-2 rounded-full transition-all">
    <Moon /> Dark
  </button>
</div>
```

- Active state: background + shadow
- Inactive: transparent
- Smooth slide animation
- Icons + text (hide text on mobile)

### Search Implementation Details

**Search Flow:**
1. User types in search bar
2. Input debounced (500ms)
3. If query.length >= 3, trigger search API call
4. Show loading spinner during search
5. Display results in SearchResults component
6. Update URL with query parameter: `/search?q={query}`
7. Cache results in React Query
8. Save search to history (localStorage)

**Search Bar States:**
```typescript
interface SearchState {
  query: string;
  isSearching: boolean;
  results: Article[];
  error: string | null;
  showSuggestions: boolean;
  recentSearches: string[];
}
```

**Keyboard Shortcuts:**
- `Cmd/Ctrl + K`: Focus search bar
- `Esc`: Close search overlay/clear search
- `Enter`: Execute search
- `Arrow Up/Down`: Navigate suggestions

**Search Suggestions (Optional):**
```typescript
const suggestions = [
  "ChatGPT latest updates",
  "Machine learning research",
  "AI ethics and regulation",
  "Computer vision breakthroughs",
  "Natural language processing",
  "Robotics and automation"
];
```

**Recent Searches (localStorage):**
```typescript
// Store max 10 recent searches
localStorage.setItem('recentSearches', JSON.stringify([
  'machine learning',
  'neural networks',
  'AI ethics'
]));
```

### Topic Categorization Flow

1. Fetch 100 articles from NewsAPI
2. Show loading state
3. Send to Gemini for categorization
4. Parse response: 5 topics with article indices
5. Create TopicCategory objects:
   ```typescript
   {
     name: "LLM Research",
     articles: [article1, article5, ...],
     icon: "brain",
     color: "blue",
     count: 23
   }
   ```
6. Render tabs: "All" + 5 topics
7. Filter articles based on selected tab

### Navigation Structure

**Desktop Header:**
```
[Logo]     [🔍 Search AI news...]     [Home] [About] [Terms] [Privacy] [Contact]     [☀️ | 🖥️ | 🌙]
```

**Mobile Header:**
```
[Logo]  [🔍]                                                      [☰]
```
- Search icon expands to full-screen overlay

**Mobile Sidebar (when open):**
```
┌─────────────────┐
│     [Close]     │
│                 │
│  [🔍 Search]    │
│                 │
│  [Home]         │
│  [About]        │
│  [Terms]        │
│  [Privacy]      │
│  [Contact]      │
│                 │
│  [☀️|🖥️|🌙]     │
└─────────────────┘
```

### Article Card Layout

```
┌────────────────────────────┐
│                            │
│      Article Image         │
│                            │
├────────────────────────────┤
│ [Category]    Source  Date │
│                            │
│ Article Title Goes Here    │
│ And Can Span Two Lines     │
│                            │
│ Description text that can  │
│ span up to three lines...  │
│                            │
│ ┌────────────────────────┐ │
│ │ ✨ AI Summary          │ │
│ │ Concise AI-generated   │ │
│ │ summary of article...  │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```

## Testing Checklist

### Functionality
- [ ] Articles fetch successfully (100 articles)
- [ ] AI categorization creates 5 topics
- [ ] All tabs work correctly
- [ ] Search functionality works
- [ ] Search debouncing works (500ms delay)
- [ ] Search results display correctly
- [ ] Search query in URL updates
- [ ] Recent searches saved to localStorage
- [ ] Clear search works
- [ ] Keyboard shortcut (Cmd/Ctrl+K) focuses search
- [ ] Search with < 3 characters shows message
- [ ] Theme toggle switches between 3 modes
- [ ] Theme persists across page reloads
- [ ] Navigation works to all pages
- [ ] External links open correctly
- [ ] Article links open in new tab
- [ ] Loading states display properly
- [ ] Error states show with retry option

### Responsive Design
- [ ] Mobile layout (< 640px)
- [ ] Tablet layout (640-1024px)
- [ ] Desktop layout (> 1024px)
- [ ] Hamburger menu works on mobile
- [ ] Search bar responsive on all devices
- [ ] Mobile search overlay works
- [ ] Touch interactions work
- [ ] Images scale properly
- [ ] Text readable at all sizes

### Accessibility
- [ ] Keyboard navigation works
- [ ] Search keyboard shortcuts work
- [ ] Screen reader compatible
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] ARIA labels present
- [ ] Semantic HTML used
- [ ] Skip to content link
- [ ] Search form accessible

### Performance
- [ ] Initial load < 3 seconds
- [ ] Images lazy load
- [ ] No layout shift
- [ ] Smooth animations
- [ ] No memory leaks
- [ ] Bundle size optimized

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

### Theme Support
- [ ] Light theme renders correctly
- [ ] Dark theme renders correctly
- [ ] System theme detection works
- [ ] Theme transitions are smooth
- [ ] All components themed properly

## Deployment

### Build Configuration
```bash
npm run build
```

### Environment Variables (Production)
- Set in hosting platform (Vercel, Netlify, etc.)
- VITE_NEWS_API_KEY
- VITE_GEMINI_API_KEY

### Recommended Hosting
- **Vercel** (recommended for React)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

### Build Output
- Optimized static files in `dist/`
- Gzipped assets
- Source maps (production)

## Documentation Requirements

### README.md
Include:
- Project description
- Features list
- Tech stack
- Installation instructions
- Environment setup
- Development commands
- Build commands
- Deployment guide
- API key setup
- Contributing guidelines (optional)
- License

### Code Comments
- Complex logic explained
- API integrations documented
- Component props documented
- Utility functions explained

## Deliverables

1. Complete React TypeScript project
2. All pages and components implemented
3. Search functionality fully working
4. Debounced search with loading states
5. Search results page with filters
6. Recent searches saved in localStorage
7. Keyboard shortcuts for search
8. Responsive design (mobile, tablet, desktop)
9. Theme toggle with 3 modes
10. Topic categorization working
11. All navigation pages (About, Terms, Privacy, Contact)
12. Professional UI with Tailwind CSS
13. API integrations functional
14. Error handling throughout
15. Loading states
16. README.md with instructions
17. .env.example file
18. TypeScript types defined
19. Accessible UI (WCAG AA)
20. SEO optimized
21. Production build ready

## Success Criteria

- Clean, modern, professional design
- Fully responsive across all devices
- Search functionality works perfectly with debouncing
- Search results display correctly
- Keyboard shortcuts work (Cmd/Ctrl+K for search)
- Recent searches saved and displayed
- Search query in URL (shareable searches)
- Theme toggle works perfectly (3 modes)
- All 100 articles load and display
- AI categorization into 5 topics successful
- All navigation pages complete and functional
- External links work (email, social media)
- Fast loading times (< 3s initial load)
- Search is fast and responsive
- No console errors
- Accessible to screen readers
- Works in all modern browsers
- Smooth animations and transitions
- Production-ready code quality

## Code Quality Standards

- TypeScript strict mode
- ESLint configured
- Prettier formatting
- Consistent naming conventions
- Component composition
- Custom hooks for logic reuse
- Separation of concerns
- DRY principle
- Proper error boundaries
- Meaningful variable names
- Clean, readable code
- Comments where needed
- No unused imports
- Optimized re-renders