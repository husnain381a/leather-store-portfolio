# Premium Leather Showcase

A modern storefront for luxury handcrafted leather whips, built with a premium visual style, category browsing, product quick views, and an authenticated admin dashboard.

## Highlights

- Luxury hero experience with animated carousel and responsive layout
- Product catalog with category-based filtering
- Quick-view modal for product details
- WhatsApp floating contact CTA for direct inquiries
- Dedicated pages for About, Contact, and Custom Manufacture
- Protected admin route with Supabase-backed authentication/data flow
- Test setup included with Vitest and Testing Library

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- Framer Motion
- React Router DOM
- Supabase JavaScript client
- Vitest + Testing Library

## Run Locally

### 1. Clone and install

```bash
git clone https://github.com/husnain381a/leather-store-portfolio.git
cd leather-store-portfolio
npm install
```

### 2. Configure environment variables

Create a file named `.env` in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If these values are missing, the app logs a configuration warning and Supabase-dependent flows will not work correctly.

### 3. Start development server

```bash
npm run dev
```

Default Vite URL:

```text
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start local dev server
- `npm run build` - Build production bundle
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Main Routes

- `/` - Home + hero + collection grid
- `/about` - Brand and craftsmanship story
- `/contact` - Contact and inquiry page
- `/custom-manufacture` - Custom order page
- `/login` - Admin login
- `/admin` - Protected admin dashboard

## Deployment Notes

- The project includes `public/_redirects`, which is useful for SPA routing on Netlify-style deployments.
- Ensure production environment variables are set for Supabase.

## Project Structure

```text
src/
	components/        Reusable UI and feature components
	context/           Auth and product state providers
	data/              Product seed/static data
	hooks/             Custom hooks (including smooth-scroll)
	lib/               Supabase client and utilities
	pages/             Route-level pages
	test/              Test setup and example tests
```

## Status

Actively maintained portfolio storefront. Contributions, fixes, and UI/content enhancements are welcome.
