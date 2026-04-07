import bullwhip1 from '@/assets/product-bullwhip-1.jpg';
import bullwhip2 from '@/assets/product-bullwhip-2.jpg';
import snakewhip1 from '@/assets/product-snakewhip-1.jpg';
import stockwhip1 from '@/assets/product-stockwhip-1.jpg';
import signalwhip1 from '@/assets/product-signalwhip-1.jpg';

export const products = [
  {
    id: 1,
    name: "Indiana Classic Bullwhip",
    category: "Bullwhips",
    size: "8 ft",
    color: "Saddle Brown",
    price: 485,
    image: bullwhip1,
    description: "Handcrafted from premium kangaroo leather, the Indiana Classic features a 12-plait body tapering to a 6-plait fall. Each whip is meticulously braided by master craftsmen with over 30 years of experience, ensuring perfect balance and exceptional crackling performance."
  },
  {
    id: 2,
    name: "Heritage Bullwhip",
    category: "Bullwhips",
    size: "10 ft",
    color: "Dark Mahogany",
    price: 625,
    image: bullwhip2,
    description: "Our flagship Heritage model showcases the pinnacle of whip-making artistry. The 16-plait construction creates an incredibly smooth taper, while the weighted handle provides perfect control for both precision work and performance."
  },
  {
    id: 3,
    name: "Serpent Snake Whip",
    category: "Snake Whips",
    size: "6 ft",
    color: "Burnished Caramel",
    price: 365,
    image: snakewhip1,
    description: "The Serpent is designed for versatility and portability. Without a rigid handle, this whip flows naturally from wrist to cracker. Made with 8-plait kangaroo leather throughout, it's the preferred choice for traveling performers."
  },
  {
    id: 4,
    name: "Outback Stock Whip",
    category: "Stock Whips",
    size: "7 ft",
    color: "Natural Tan",
    price: 545,
    image: stockwhip1,
    description: "Inspired by the Australian stockman's traditional tool, our Outback features a cane handle with brass ferrule and genuine kangaroo leather thong. The distinct two-piece design allows for powerful cracks with minimal effort."
  },
  {
    id: 5,
    name: "Precision Signal Whip",
    category: "Signal Whips",
    size: "4 ft",
    color: "Obsidian Black",
    price: 285,
    image: signalwhip1,
    description: "Compact yet commanding, the Precision Signal is perfect for indoor performances and close-quarters work. The shorter length provides exceptional control while still delivering satisfying cracks."
  },
  {
    id: 6,
    name: "Maverick Bullwhip",
    category: "Bullwhips",
    size: "6 ft",
    color: "Antique Brown",
    price: 395,
    image: bullwhip1,
    description: "The Maverick is our entry point into professional-grade whips. At 6 feet, it's ideal for learning advanced techniques while still offering the craftsmanship expected from Premium Leather Whips."
  },
  {
    id: 7,
    name: "Viper Snake Whip",
    category: "Snake Whips",
    size: "5 ft",
    color: "Black & Tan",
    price: 345,
    image: snakewhip1,
    description: "The Viper combines striking aesthetics with superior performance. The two-tone braiding pattern makes this whip as beautiful to look at as it is to crack."
  },
  {
    id: 8,
    name: "Drovers Stock Whip",
    category: "Stock Whips",
    size: "8 ft",
    color: "Cognac",
    price: 585,
    image: stockwhip1,
    description: "Built for the serious collector, the Drovers features an extended thong and reinforced keeper. The hardwood handle is hand-turned and fitted with custom brass hardware."
  }
];

export const categories = ["All", "Bullwhips", "Snake Whips", "Stock Whips", "Signal Whips", "Accessories"];

export const heroSlides = [
  {
    id: 1,
    title: "Artisan Crafted",
    subtitle: "Excellence",
    description: "Each whip is hand-braided by master craftsmen using centuries-old techniques and the finest kangaroo leather.",
    image: null // Will use hero-bullwhip
  },
  {
    id: 2,
    title: "Timeless",
    subtitle: "Elegance",
    description: "From professional performers to discerning collectors, our whips represent the pinnacle of the craft.",
    image: null // Will use hero-snakewhip
  },
  {
    id: 3,
    title: "Uncompromising",
    subtitle: "Quality",
    description: "Premium materials, meticulous construction, and a lifetime warranty stand behind every piece we create.",
    image: null // Will use hero-stockwhip
  }
];
