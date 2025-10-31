# UNILAG Conference 2025 - Mobile-First PWA

A beautiful, feature-rich Progressive Web App (PWA) for the UNILAG Conference 2025, built with React, Next.js, TypeScript, Tailwind CSS, and Framer Motion. Designed mobile-first with smooth animations, offline capabilities, and comprehensive state management.

## Overview

The UNILAG Conference 2025 app is a complete solution for conference attendees, providing:

- **Interactive Schedule Management** - Browse sessions, add favorites, get conflict alerts
- **Hotel Directory** - Discover accommodation, compare prices, filter by preferences
- **Venue Navigation** - Interactive campus map with floor plans and points of interest
- **Travel Guide** - Comprehensive preparation guide with visa, health, packing info
- **Real-time Updates** - Latest conference news and announcements
- **Offline Access** - Full functionality even without internet connection
- **Mobile-Optimized** - Beautiful bottom navigation, smooth animations, responsive design

## Tech Stack

### Core Framework

- **Next.js 16** - React framework with SSR and API routes
- **React 19.2** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **React Router DOM 7** - Client-side routing with smooth transitions

### Styling & Animations

- **Tailwind CSS v4** - Utility-first CSS framework with theme system
- **Framer Motion 12** - Smooth animations and transitions
- **shadcn/ui** - High-quality component library built on Radix UI
- **Lucide React** - Beautiful icon set

### State Management & Data

- **Zustand 5** - Lightweight state management with localStorage persistence
- **React Hook Form** - Efficient form handling
- **Zod** - TypeScript-first schema validation

### PWA & Offline

- **Service Workers** - Network-first caching strategy
- **Web Manifest** - Native app installation
- **localStorage** - Offline data persistence
- **Background Sync** - Sync data when reconnected

### UI Components

- **Radix UI** - Accessible component primitives
- **Sonner** - Toast notifications
- **Recharts** - Data visualization
- **Embla Carousel** - Image carousel

## Project Structure

\`\`\`
.
├── app/ # Next.js app directory
│ ├── page.tsx # Main app with routing
│ ├── layout.tsx # Root layout with providers
│ └── globals.css # Global styles and theme
│
├── components/
│ ├── layout/
│ │ ├── header.tsx # Top header with title
│ │ └── bottom-nav.tsx # Mobile bottom navigation (5 tabs)
│ │
│ ├── pages/
│ │ ├── home-page.tsx # Home with countdown, hero, quick access
│ │ ├── schedule-page.tsx # Schedule with timeline, tracks, favorites
│ │ ├── hotels-page.tsx # Hotels with search, filter, compare
│ │ ├── map-page.tsx # Campus map and floor plans
│ │ ├── travel-guide-page.tsx # Preparation guide with PDF export
│ │ └── more-page.tsx # Additional features (settings, help)
│ │
│ ├── layout/
│ │ ├── providers.tsx # Unified providers wrapper
│ │ ├── error-boundary.tsx # Error handling boundary
│ │ ├── unified-page-wrapper.tsx # Consistent page wrapper
│ │ ├── offline-indicator.tsx # Connection status banner
│ │ ├── pwa-install-prompt.tsx # PWA installation prompt
│ │ └── scroll-to-top.tsx # Scroll to top button
│ │
│ ├── features/
│ │ ├── countdown-timer.tsx # Animated countdown
│ │ ├── weather-widget.tsx # Weather display
│ │ ├── emergency-fab.tsx # Emergency contacts FAB
│ │ ├── skeleton-loader.tsx # Loading skeletons
│ │ ├── image-lazy.tsx # Lazy image loading
│ │ ├── pull-to-refresh.tsx # Pull-to-refresh gesture
│ │ └── quick-access-card.tsx # Quick access card component
│ │
│ └── ui/ # shadcn/ui components (75+ components)
│
├── store/
│ ├── conference-store.ts # Unified conference state
│ ├── schedule-store.ts # Schedule-specific state
│ ├── app-store.ts # App-wide state
│ └── offline-store.ts # Offline data persistence
│
├── hooks/
│ ├── use-mobile.ts # Mobile viewport detection
│ ├── use-toast.ts # Toast notifications hook
│ └── use-reduced-motion.ts # Respect prefers-reduced-motion
│
├── lib/
│ └── utils.ts # Utility functions (cn, format, etc.)
│
├── public/
│ ├── manifest.json # PWA manifest
│ ├── sw.js # Service worker
│ ├── icons/ # App icons (192x192, 512x512)
│ └── screenshots/ # PWA screenshots
│
├── package.json # Dependencies
├── tsconfig.json # TypeScript config
├── next.config.mjs # Next.js config
├── tailwind.config.ts # Tailwind config
└── postcss.config.mjs # PostCSS config
\`\`\`

## Features

### 1. Home Page

- **Countdown Timer** - Animated countdown to November 4, 2025 with Framer Motion
- **Hero Section** - Gradient background with parallax effect
- **Quick Access Grid** - 6 card shortcuts (Getting Here, Hotels, Map, Schedule, Food, Transport)
- **Weather Widget** - Current conditions in Lagos
- **Emergency FAB** - Floating action button with emergency contacts
- **Latest Updates** - Featured announcements section

### 2. Schedule Page

- **Multiple Views** - Agenda timeline, Track groupings, Personal schedule
- **Session Details** - Full descriptions, speaker info, room assignments
- **Search & Filter** - By track, level, or title
- **Favorites System** - Star sessions, export to calendar
- **Conflict Detection** - Alerts for overlapping starred sessions
- **Offline Access** - All sessions cached locally

### 3. Hotels Page

- **Hotel Directory** - Curated list with ratings, pricing, distance
- **Advanced Filtering** - By price range, distance, amenities
- **Sorting Options** - By rating, price, or proximity
- **Hotel Comparison** - Side-by-side comparison table
- **Direct Booking** - WhatsApp and phone contact buttons
- **Featured Section** - Special rates for UNILAG guests

### 4. Map Page

- **Campus Map** - SVG-based interactive venue map
- **Floor Plans** - Building interiors with room navigation
- **Points of Interest** - Restaurants, restrooms, ATMs, WiFi zones
- **Zoom Controls** - Mobile-friendly viewport adjustment
- **Location Search** - Find buildings and facilities

### 5. Travel Guide Page

- **Collapsible Sections** - Visa, Health, Packing, Money, Transportation
- **Checklists** - Interactive preparation checklists with progress tracking
- **PDF Export** - Download complete guide as PDF
- **Tips & Resources** - Practical advice and contact information
- **Local Info** - Lagos-specific travel information

### 6. More Page

- **Help & Support** - FAQs and contact options
- **Settings** - Notification preferences, theme (if applicable)
- **Feedback** - In-app feedback submission
- **About** - App information and credits
- **Share** - Social media and direct sharing

### 7. PWA Features

- **Offline Mode** - Works without internet using cached data
- **Install Prompt** - "Add to Home Screen" installation
- **Service Worker** - Network-first caching strategy
- **Data Sync** - Automatic sync when reconnected
- **Responsive Icons** - Adaptive icons for different platforms

### 8. Animations & Interactions

- **Page Transitions** - Smooth fade and slide animations
- **Card Animations** - Stagger effects on page load
- **Hover Effects** - Elevation and scale on interactive elements
- **Gesture Support** - Pull-to-refresh, swipe navigation
- **Micro-interactions** - Button presses, loading states, success animations

### 9. Accessibility

- **ARIA Labels** - Complete accessibility labels on all interactive elements
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader** - Optimized for assistive technologies
- **Color Contrast** - WCAG AA compliance
- **Semantic HTML** - Proper heading structure and landmarks
- **Reduced Motion** - Respects prefers-reduced-motion setting

### 10. Error Handling

- **Error Boundaries** - Graceful error handling and recovery
- **Retry Logic** - Automatic retry with exponential backoff
- **User Feedback** - Clear error messages and guidance
- **Fallback UI** - Default states when data unavailable
- **Logging** - Comprehensive error logging

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- Modern browser with PWA support

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/unilag-conference-2025.git
   cd unilag-conference-2025
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The app will be available at `http://localhost:3000`

4. **Build for production**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

### Environment Variables

The app works with no environment variables required for local development. For production deployment, optional variables:

\`\`\`env

# Optional analytics (if integrating external services)

NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

## Usage Guide

### Navigation

- **Bottom Navigation** - 5 main tabs: Home, Schedule, Hotels, Map, More
- **Active Tab** - Highlighted in green (#00A651) with scale animation
- **Direct Links** - Quick access cards on home page for faster navigation

### Schedule Management

1. Open Schedule tab
2. Switch between Agenda/Tracks/My Schedule views
3. Click sessions to expand details
4. Star/unstar to add to personal schedule
5. Use filters and search to find specific sessions

### Hotel Search

1. Open Hotels tab
2. Adjust price and distance filters
3. Sort by your preference
4. Click hotels to view details
5. Use comparison mode to evaluate options
6. Tap WhatsApp button to contact directly

### Map Navigation

1. Open Map tab
2. Tap locations to see details
3. Use zoom controls for floor plans
4. Search for specific locations
5. Tap POI cards to get directions

### Offline Usage

1. Visit all pages once while online (pages cache automatically)
2. The offline indicator appears when disconnected
3. All previously visited content available offline
4. Starred schedule items sync when reconnected

### PWA Installation

- **Android**: Tap "Add to Home Screen" when prompted
- **iOS**: Tap Share → Add to Home Screen in Safari
- **Desktop**: Install button in address bar (Chrome/Edge)
- App runs with native app experience including home screen icon

## Development

### Architecture

The app follows a component-driven architecture with clear separation of concerns:

**Component Hierarchy**
\`\`\`
App (Router)
├── Providers (All context/providers)
│ ├── ErrorBoundary
│ ├── ToastProvider
│ ├── OfflineIndicator
│ ├── PWAInstallPrompt
│ ├── ScrollToTop
│ └── Children
├── Header
├── Main Content (Route-based)
│ └── UnifiedPageWrapper
│ ├── Loading State
│ ├── Error State
│ └── Page Component
└── BottomNav
\`\`\`

**State Management Flow**
\`\`\`
ConferenceStore (Zustand)
├── UI State (currentTab, theme)
├── Schedule State (starred sessions, filters)
├── Hotel State (filters, comparisons)
├── Travel Guide State (checklists)
├── Offline State (connection status, cached data)
└── localStorage Persistence (automatic)
\`\`\`

### Adding New Features

#### Creating a New Page

1. **Create page component**
   \`\`\`typescript
   // components/pages/new-page.tsx
   export default function NewPage() {
   return (
   <div className="space-y-6 p-4">
   <h1 className="text-2xl font-bold">New Page</h1>
   {/_ Content _/}
   </div>
   )
   }
   \`\`\`

2. **Add route in app/page.tsx**
   \`\`\`typescript
   import NewPage from "@/components/pages/new-page"

// In Routes:
<Route
path="/new-page"
element={
<UnifiedPageWrapper>
<NewPage />
</UnifiedPageWrapper>
}
/>
\`\`\`

3. **Add navigation button in bottom-nav.tsx**
   \`\`\`typescript
   {
   icon: MapIcon,
   label: "New",
   path: "/new-page",
   }
   \`\`\`

#### Adding State Management

1. **Add to ConferenceStore**
   \`\`\`typescript
   // store/conference-store.ts
   interface ConferenceStore {
   // ... existing state
   newFeature: {
   data: any[]
   loading: boolean
   }
   setNewFeatureData: (data: any[]) => void
   }

// In create:
newFeature: {
data: [],
loading: false,
},
setNewFeatureData: (data) => set((state) => ({
newFeature: { ...state.newFeature, data }
})),
\`\`\`

2. **Use in component**
   \`\`\`typescript
   import { useConferenceStore } from "@/store/conference-store"

export default function MyComponent() {
const { newFeature, setNewFeatureData } = useConferenceStore()

return (
// Component with access to state
)
}
\`\`\`

#### Adding a Component

1. **Create component file**
   \`\`\`typescript
   // components/my-component.tsx
   "use client"

import { motion } from "framer-motion"

interface MyComponentProps {
title: string
onClick: () => void
}

export default function MyComponent({ title, onClick }: MyComponentProps) {
return (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
onClick={onClick}
data-testid="my-component" >
{title}
</motion.div>
)
}
\`\`\`

2. **Use in pages or other components**
   \`\`\`typescript
   import MyComponent from "@/components/my-component"

// In component:
<MyComponent title="Hello" onClick={() => console.log("clicked")} />
\`\`\`

### Code Standards

**Component Structure**

- Use functional components with hooks
- Add `"use client"` for client components in Next.js 16
- Export default component at end of file
- Use TypeScript interfaces for props

**Naming Conventions**

- Components: PascalCase (Button.tsx)
- Hooks: camelCase starting with "use" (useAuth.ts)
- Stores: kebab-case ending with -store (app-store.ts)
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case

\*\*Testing

- Add `data-testid` to interactive elements
- Format: `data-testid="feature-action"` (e.g., "schedule-star-session")
- Use for E2E testing without test files in this project

\*\*Animations

- Use Framer Motion for all animations
- Standard duration: 0.3s with ease-out
- Stagger delay for lists: 0.05-0.1s between items
- Respect `prefers-reduced-motion` using `useReducedMotion` hook

\*\*Styling

- Use Tailwind CSS utility classes
- Use design tokens from CSS variables
- Follow mobile-first responsive design
- Color palette: #00A651 (green), #FDB913 (gold), #F8FAFC (background)

### Performance Optimization

1. **Image Loading**

   - Use `ImageLazy` component for images
   - Implement lazy loading attributes
   - Optimize image sizes for mobile

2. **Code Splitting**

   - Pages automatically split via React Router
   - Use dynamic imports for heavy components

3. **State Management**

   - Use Zustand selectors for granular subscriptions
   - Avoid unnecessary re-renders with memoization

4. **Service Worker**
   - Network-first strategy for API calls
   - Cache-first for static assets
   - Update caching headers as needed

### Debugging

**Console Logging**
\`\`\`typescript
// Use v0 convention for logs
console.log("[v0] Component mounted:", props)
console.log("[v0] Store updated:", state)
console.error("[v0] Error occurred:", error)
\`\`\`

**Redux DevTools** (if needed for Zustand)
\`\`\`bash
npm install zustand-devtools
\`\`\`

**Service Worker**

- Open DevTools → Application → Service Workers
- Check for errors and registration status
- Clear cache via "Clear site data" when needed

## Contributing

### Getting Started with Contributing

1. **Fork the repository** on GitHub
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Make your changes** following code standards above
4. **Test your changes**
   - Run development server: `npm run dev`
   - Test on mobile device or emulator
   - Check offline functionality
   - Verify animations and interactions
5. **Commit with clear messages**
   \`\`\`bash
   git commit -m "feat: add amazing feature

   - Description of what was added
   - Why it improves the app
   - Any related issues or PRs"
     \`\`\`

6. **Push to your fork**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
7. **Create a Pull Request** with detailed description

### Pull Request Guidelines

- **Title**: Start with type (feat:, fix:, docs:, style:, refactor:, perf:)
- **Description**: Explain what and why, not just how
- **Testing**: Describe how to test the changes
- **Screenshots**: Include for UI changes
- **Breaking Changes**: Clearly mark any breaking changes

### Issues & Feature Requests

**Reporting Bugs**
\`\`\`markdown

## Description

Brief description of the bug

## Steps to Reproduce

1. Click on X
2. Then do Y
3. Bug occurs

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Device Info

- Device: iPhone 14 Pro / Desktop
- OS: iOS 17 / macOS 14
- Browser: Safari / Chrome
  \`\`\`

**Feature Requests**
\`\`\`markdown

## Feature Description

What feature should be added?

## Use Cases

When would users need this?

## Implementation Ideas

How might this be implemented?

## Related Issues

Any related issues?
\`\`\`

### Development Workflow

1. **Before starting**: Check open issues and PRs
2. **Create issue** if feature doesn't exist
3. **Work on feature branch** from latest main
4. **Keep commits atomic** (one logical change per commit)
5. **Run linter**: `npm run lint`
6. **Test thoroughly** before submitting PR
7. **Request review** from maintainers
8. **Address feedback** in follow-up commits
9. **Celebrate** when merged!

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git push origin main
   \`\`\`

2. **Connect to Vercel**

   - Go to vercel.com
   - Click "New Project"
   - Select GitHub repository
   - Vercel auto-detects Next.js

3. **Configure environment**

   - Add environment variables if needed
   - Set production URL

4. **Deploy**
   - Vercel automatically deploys on push to main
   - Preview deployments for PRs
   - Automatic SSL certificate

### Deploy to Other Platforms

**Netlify**
\`\`\`bash
npm run build

# Configure netlify.toml for Next.js routing

\`\`\`

**Docker**
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package\*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

**Manually**
\`\`\`bash
npm run build
npm start

# App runs on http://localhost:3000

\`\`\`

## Browser Support

- **Chrome/Edge**: 90+
- **Safari**: 15+ (desktop), 15+ (iOS)
- **Firefox**: 88+
- **Mobile**: iOS Safari 15+, Chrome Android 90+

## Performance Metrics

Target metrics:

- **Lighthouse Score**: 95+ overall
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 2s

## Troubleshooting

### Service Worker Not Loading

\`\`\`javascript
// In DevTools
// Clear cache
navigator.serviceWorker.getRegistrations().then(r =>
r.forEach(x => x.unregister())
);
\`\`\`

### Offline Data Not Syncing

- Check browser's localStorage quota
- Verify ConferenceStore initialization
- Check service worker status in DevTools

### Animations Lagging

- Check for `prefers-reduced-motion` setting
- Profile with DevTools Performance tab
- Reduce animation complexity for low-end devices

### Route Not Loading

- Verify route added in app/page.tsx
- Check component export is default export
- Ensure page wrapped in UnifiedPageWrapper
- Check browser console for errors

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support & Contact

- **Documentation**: See README and inline code comments
- **Issues**: Report via GitHub Issues
- **Questions**: Open a Discussion on GitHub
- **Email**: support@unilagconference.edu.ng (if applicable)

## Acknowledgments

- **Shadcn/ui** - Component library
- **Framer Motion** - Animation framework
- **Vercel** - Deployment platform
- **Next.js Team** - React framework
- **Conference Team** - Feature requirements and testing

## Roadmap

### Phase 1 (Current)

- [x] Core PWA functionality
- [x] Multi-page navigation
- [x] Schedule management
- [x] Offline support
- [x] Animations and interactions

### Phase 2 (Planned)

- [ ] Push notifications
- [ ] User authentication
- [ ] Session rating & feedback
- [ ] Networking features
- [ ] Advanced analytics

### Phase 3 (Future)

- [ ] AR venue navigation
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] Live polling and Q&A
- [ ] Event integration APIs

---

**Built with ❤️ for UNILAG Conference 2025**

Last updated: {{ date }}
