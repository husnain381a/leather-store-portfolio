import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-serif text-8xl text-primary">404</h1>
        <h2 className="mt-4 font-serif text-3xl text-foreground">Page Not Found</h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-luxury mt-8 inline-block">
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
