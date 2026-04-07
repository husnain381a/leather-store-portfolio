Below is a summary of the technical architecture and the logic behind our implementation:

1. What We Used
We built a modern tech stack focused on high performance and "Artisan Crafted" aesthetics:
Frontend: React.js with Tailwind CSS for the luxury dark theme and Framer Motion for smooth, high-end animations.
Backend-as-a-Service: Supabase for the PostgreSQL database, Authentication (Admin/Public roles), and Storage for product images.
Routing: react-router-dom to manage the seamless transition between the Home, About, Contact, and Admin pages.
Icons: Lucide-React for minimalist, themed iconography across the dashboard and contact sections.

2. Why We Used It
Each choice was made to solve specific technical challenges:
Supabase RLS (Row Level Security): We used this to ensure that only you (the Admin) can add or delete products, while your customers can only view them.
React Context API: We implemented ProductContext to ensure that when you add a product in the Admin Console, it instantly updates the storefront without a page reload.
AbortController: We added this to fix "AbortErrors" caused by React's Strict Mode, ensuring your database connection remains stable during fast navigation.
Local Video: We utilized local video on the About page to showcase your Sialkot craftsmanship without relying on third-party players like YouTube, maintaining a "premium" ad-free look.

3. How We Implemented It
We followed a systematic workflow to move from errors to a live site:
Schema Synchronization: We updated the Supabase database using SQL commands to include color and size columns so they matched your React form fields.
Security Configuration: We verified that your user ID was assigned the admin role in the profiles table to grant you access to the Masterpiece creator.
Image Pipeline: We configured the Admin Dashboard to take a local file, upload it to the Supabase "product-images" bucket, and then save that public URL into the product's database row.
Universal Navigation: We updated the App.jsx and Header.jsx to link the new About, Contact, and Login pages into a single, cohesive user journey.
