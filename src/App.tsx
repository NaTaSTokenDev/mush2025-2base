import React, { useState } from 'react';
import { Recipe, RecipeFormData, AdminState, BlogPost } from './types';
import { defaultRecipes } from './data/defaultRecipes';
import { RecipeCard } from './components/RecipeCard';
import { RecipeForm } from './components/RecipeForm';
import { RecipeDetail } from './components/RecipeDetail';
import { AdminPanel } from './components/AdminPanel';
import { Plus, Search, Shield } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { LinksPage } from './components/LinksPage';
import { BlogList } from './components/BlogList';
import { BlogForm } from './components/BlogForm';
import { BlogPost as BlogPostComponent } from './components/BlogPost';
import { auth } from './lib/firebase';
import { EbooksSection } from './components/EbooksSection';
import { ColonizationEstimator } from './components/ColonizationEstimator';
import { MarketPrices } from './components/MarketPrices';
import { ProductLinks } from './components/ProductLinks';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(defaultRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Recipe['category'] | 'all'>('all');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);

  const user = auth.currentUser;
  const isAdmin = user?.email === 'admin@mushroomservice.com';

  const pendingRecipes = recipes.filter(recipe => recipe.status === 'pending');

  const handleAddRecipe = (formData: RecipeFormData) => {
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
      isCustom: true,
      status: 'pending'
    };
    setRecipes(prev => [...prev, newRecipe]);
    setShowForm(false);
  };

  const handleRecipeAction = (recipeId: string, action: 'approve' | 'reject' | 'delete') => {
    switch (action) {
      case 'approve':
        setRecipes(prev =>
          prev.map(recipe =>
            recipe.id === recipeId ? { ...recipe, status: 'approved' } : recipe
          )
        );
        break;
      case 'reject':
        setRecipes(prev =>
          prev.map(recipe =>
            recipe.id === recipeId ? { ...recipe, status: 'rejected' } : recipe
          )
        );
        break;
      case 'delete':
        setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
        break;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            {/* Hero Section */}
            <section className="relative h-[600px] overflow-hidden">
              <img
                src="/src/images/mushheader1.jpeg"
                alt="Mushroom cultivation"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.6)' }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center pt-20">
                <div className="flex items-center gap-8 mb-8">
                  <img
                    src="/src/images/mushroomservicelogo.png"
                    alt="Mushroom Service Logo"
                    className="w-48 h-48 object-contain rounded-lg"
                  />
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Fresh Mushrooms & Professional Growing Supplies
                  </h1>
                  <img
                    src="/src/images/kingoyster_1.jpeg"
                    alt="King Oyster Mushrooms"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>

                <p className="text-xl text-amber-100 mb-8 max-w-2xl">
                  Your premier source for gourmet mushrooms and cultivation equipment in Edenton, NC
                </p>
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <button
                    onClick={() => setActiveSection('shop')}
                    className="bg-amber-600 text-white px-8 py-3 rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-amber-900 mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <ProductCard
                    title="Blue Oyster Mushrooms"
                    price={12.99}
                    imagePlaceholder="https://i.ibb.co/HDfCcP96/blueoyster.jpg"
                    description="Fresh, locally grown Blue Oyster mushrooms"
                    sku="blue-oyster-fresh"
                    weight={454}
                    maxQuantity={10}
                  />
                  <ProductCard
                    title="Coir Block"
                    price={4.99}
                    imagePlaceholder="https://i.ibb.co/sp6gtTHx/coco-coir-block-500x500.webp"
                    description="Coir Block"
                    sku="coir"
                    weight={1340}
                    maxQuantity={8}
                  />
                  <ProductCard
                    title="Sterilized Grain Spawn"
                    price={24.99}
                    imagePlaceholder="https://i.ibb.co/HDfCcP96/blueoyster.jpg"
                    description="Professional grade grain spawn bags"
                    sku="grain-spawn-sterile"
                    weight={1134}
                    maxQuantity={20}
                  />
                </div>
              </div>
            </section>

            {/* Product Links Section */}
            <ProductLinks />
          </>
        );

      case 'shop':
        return (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-amber-900 mb-8">Our Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-amber-800">Fresh Mushrooms</h3>
                  <div className="grid gap-6">
                    <ProductCard
                      title="Blue Oyster Mushrooms"
                      price={12.99}
                      imagePlaceholder="https://i.ibb.co/HDfCcP96/blueoyster.jpg"
                      description="Fresh, locally grown Blue Oyster mushrooms"
                      sku="blue-oyster-fresh"
                      weight={454}
                      maxQuantity={10}
                    />
                    <ProductCard
                      title="Coir Block"
                      price={4.99}
                      imagePlaceholder="https://i.ibb.co/sp6gtTHx/coco-coir-block-500x500.webp"
                      description="Coir Block"
                      sku="coir"
                      weight={1340}
                      maxQuantity={8}
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-amber-800">Growing Supplies</h3>
                  <div className="grid gap-6">
                    <ProductCard
                      title="Sterilized Grain Spawn"
                      price={24.99}
                      imagePlaceholder="https://i.ibb.co/HDfCcP96/blueoyster.jpg"
                      description="Professional grade grain spawn bags"
                      sku="grain-spawn-sterile"
                      weight={1134}
                      maxQuantity={20}
                    />
                    <ProductCard
                      title="Substrate Blocks"
                      price={19.99}
                      imagePlaceholder="https://i.ibb.co/HDfCcP96/blueoyster.jpg"
                      description="Ready-to-fruit substrate blocks"
                      sku="substrate-blocks"
                      weight={2268}
                      maxQuantity={10}
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-amber-800">Equipment</h3>
                  <div className="grid gap-6">
                    <ProductCard
                      title="Pressure Cooker"
                      price={299.99}
                      imagePlaceholder="https://i.ibb.co/HDfCcP96/blueoyster.jpg"
                      description="23qt Pressure cooker for sterilization"
                      sku="pressure-cooker-23qt"
                      weight={6804}
                      maxQuantity={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'recipes':
        return (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-amber-900">Cultivation Recipes</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Submit Recipe
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => setShowAdminPanel(true)}
                      className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Admin Panel
                      {pendingRecipes.length > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {pendingRecipes.length}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-2">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4">Categories</h3>
                    <div className="space-y-2">
                      {[
                        { id: 'all', label: 'All Recipes', count: recipes.length },
                        { id: 'agar', label: 'Agar Recipes', count: recipes.filter(r => r.category === 'agar').length },
                        { id: 'liquid-culture', label: 'Liquid Culture', count: recipes.filter(r => r.category === 'liquid-culture').length },
                        { id: 'substrate', label: 'Substrate', count: recipes.filter(r => r.category === 'substrate').length },
                        { id: 'other', label: 'Other', count: recipes.filter(r => r.category === 'other').length }
                      ].map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id as Recipe['category'] | 'all')}
                          className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-amber-700 text-white'
                              : 'hover:bg-amber-100 text-amber-900'
                          }`}
                        >
                          <span>{category.label}</span>
                          <span className="float-right bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs">
                            {category.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search recipes..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full rounded-md border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white/80 backdrop-blur-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recipes
                      .filter(recipe => {
                        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
                        return matchesSearch && matchesCategory;
                      })
                      .map(recipe => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          onClick={() => setSelectedRecipe(recipe)}
                          isAdmin={isAdmin}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'blog':
        return (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-amber-900">Blog</h2>
              </div>
              <BlogList posts={[]} isAdmin={isAdmin} onNewPost={() => setShowBlogForm(true)} />
            </div>
          </section>
        );

      case 'ebooks':
        return <EbooksSection />;

      case 'tools':
        return <ColonizationEstimator />;

      case 'links':
        return <LinksPage />;

      case 'prices':
        return <MarketPrices />;

      case 'admin':
        if (!isAdmin) return null;
        return (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-amber-900 mb-8">Admin Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-4">Blog Management</h3>
                  <button
                    onClick={() => setShowBlogForm(true)}
                    className="flex items-center px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    New Blog Post
                  </button>
                </div>

                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-4">Recipe Management</h3>
                  <button
                    onClick={() => setShowAdminPanel(true)}
                    className="flex items-center px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Manage Recipes
                    {pendingRecipes.length > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {pendingRecipes.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {renderContent()}

      {/* Modals */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Submit New Recipe</h2>
            <RecipeForm
              onSubmit={handleAddRecipe}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <RecipeDetail
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            isAdmin={isAdmin}
          />
        </div>
      )}

      {showAdminPanel && isAdmin && (
        <AdminPanel
          recipes={pendingRecipes}
          onClose={() => setShowAdminPanel(false)}
          onAction={handleRecipeAction}
        />
      )}

      {/* Blog Form Modal */}
      {showBlogForm && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Create New Blog Post</h2>
            <BlogForm
              onSubmit={(data) => {
                // Handle blog post submission
                setShowBlogForm(false);
              }}
              onCancel={() => setShowBlogForm(false)}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;