import React from 'react';
import { ExternalLink, Star, ThumbsUp, Award, Gift } from 'lucide-react';

interface ProductLink {
  title: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  price: string;
  rating?: number;
  category: string;
  badge?: string;
}

const productLinks: ProductLink[] = [
  {
    category: "Best Sellers",
    title: "Premium Pressure Cooker 23QT",
    description: "Perfect for sterilizing substrate and grain spawn. A must-have for serious cultivators.",
    imageUrl: "https://i.ibb.co/6Hw8Q2H/pressure-cooker.jpg",
    affiliateUrl: "#",
    price: "$299.99",
    rating: 4.8,
    badge: "Most Popular"
  },
  {
    category: "Essential Tools",
    title: "Digital pH Meter",
    description: "Accurate pH measurements for perfect substrate preparation.",
    imageUrl: "https://i.ibb.co/6Hw8Q2H/ph-meter.jpg",
    affiliateUrl: "#",
    price: "$49.99",
    rating: 4.5
  },
  {
    category: "Beginner Friendly",
    title: "Complete Grow Kit",
    description: "Everything you need to start growing gourmet mushrooms at home.",
    imageUrl: "https://i.ibb.co/6Hw8Q2H/grow-kit.jpg",
    affiliateUrl: "#",
    price: "$79.99",
    rating: 4.9,
    badge: "Best for Beginners"
  },
  {
    category: "Books",
    title: "Growing Gourmet and Medicinal Mushrooms",
    description: "The comprehensive guide by Paul Stamets.",
    imageUrl: "https://i.ibb.co/6Hw8Q2H/book.jpg",
    affiliateUrl: "#",
    price: "$45.99",
    rating: 4.9,
    badge: "Essential Reading"
  }
];

const categories = [
  { name: "Best Sellers", icon: Star },
  { name: "Essential Tools", icon: ThumbsUp },
  { name: "Beginner Friendly", icon: Gift },
  { name: "Books", icon: Award }
];

export function ProductLinks() {
  const [activeCategory, setActiveCategory] = React.useState("Best Sellers");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Recommended Products</h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Curated selection of high-quality cultivation supplies and educational materials. 
            As Amazon Associates, we earn from qualifying purchases.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center px-6 py-3 rounded-full transition-colors ${
                  activeCategory === category.name
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productLinks
            .filter(product => product.category === activeCategory)
            .map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">{product.title}</h3>
                  <p className="text-amber-700 text-sm mb-4">{product.description}</p>
                  
                  {product.rating && (
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-amber-700">{product.rating}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-900">{product.price}</span>
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                    >
                      View on Amazon
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-8 text-center text-sm text-amber-700">
          <p>* Prices and availability are accurate as of the date/time indicated and are subject to change.</p>
        </div>
      </div>
    </section>
  );
}