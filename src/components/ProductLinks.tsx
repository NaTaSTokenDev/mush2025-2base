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
    imageUrl: "https://i.ibb.co/27XX3D9c/cooker1.jpg",
    affiliateUrl: "https://amzn.to/41oE4EC",
    price: "$134.10",
    rating: 4.8,
    badge: "Most Popular"
  },
  {
    category: "Best Sellers",
    title: "All-Season 4-Tier Mini Grow House",
    description: "Great Cheap Starter Tent = All-Season 4-Tier Mini Grow House Outdoor or Backyard Easy Assembly Portable Greenhouse, Translucent",
    imageUrl: "https://i.ibb.co/6cWQTcM9/tent1.png",
    affiliateUrl: "https://amzn.to/4gTiZqD",
    price: "$59.99",
    rating: 4.5
  },
  {
    category: "Best Sellers",
    title: "Foldable Small Kitchen Funnel",
    description: "OTOTO Mushroom - Foldable Small Kitchen Funnel with Wide Mouth for Jars. Bottle Liquid Transfer - Silicone, 100% Food Safe, BPA Free, Dishwasher Safe",
    imageUrl: "https://i.ibb.co/HDFc9vdR/funnel1.jpg",
    affiliateUrl: "https://amzn.to/4hO4zZR",
    price: "$13.95",
    rating: 4.7,
    badge: "Most Popular"
  },
{
    category: "Essential Tools",
    title: "Govee WiFi Hygrometer Thermometer",
    description: "Govee WiFi Hygrometer Thermometer Sensor 3 Pack, Indoor Wireless Smart Temperature Humidity Monitor with Remote App Notification Alert, 2 Years Data Storage Export, for Home, Greenhouse",
    imageUrl: "https://i.ibb.co/hJkWN40N/sensor.jpg",
    affiliateUrl: "#",
    price: "$59.99",
    rating: 4.5
  },
  {
    category: "Essential Tools",
    title: "All-Season 4-Tier Mini Grow House",
    description: "Great Cheap Starter Tent = All-Season 4-Tier Mini Grow House Outdoor or Backyard Easy Assembly Portable Greenhouse, Translucent",
    imageUrl: "https://i.ibb.co/6cWQTcM9/tent1.png",
    affiliateUrl: "https://amzn.to/4gTiZqD",
    price: "$59.99",
    rating: 4.5
  },
  {
    category: "Essential Tools",
    title: "Syringe Filters",
    description: "Syringe Filters PTFE Hydrophobic 25 mm 0.22 um Non Sterile 25/pk by KS-Tek",
    imageUrl: "https://i.ibb.co/RTcV4H5H/filter1.jpg",
    affiliateUrl: "https://amzn.to/41oeorI",
    price: "$13.99",
    rating: 4.5
  },
  {
    category: "Substrate Preperation",
    title: "Horticultural Coarse Vermiculite",
    description: "Horticultural Coarse Vermiculite - 4 Cubic Feet",
    imageUrl: "https://i.ibb.co/b5t1mBLv/verm1.jpg",
    affiliateUrl: "https://amzn.to/4bc2aG0",
    price: "$56.38",
    rating: 4.8,
    badge: "Substrate Prep"
  },
  {
    category: "Books",
    title: "Beginner's Guide to Safely Foraging for Wild Mushrooms",
    description: "Beginner's Guide to Safely Foraging for Wild Mushrooms: Identifying and Collecting Mushrooms Sustainably with Confidence ",
    imageUrl: "https://i.ibb.co/BHhk5tXm/book1.jpg",
    affiliateUrl: "https://amzn.to/4bcyg4p",
    price: "$8.64",
    rating: 4.7,
    badge: "Essential Reading"
  }
];

const categories = [
  { name: "Best Sellers", icon: Star },
  { name: "Essential Tools", icon: ThumbsUp },
  { name: "Substrate Preperation", icon: Gift },
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
