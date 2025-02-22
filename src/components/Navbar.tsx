import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sprout, Book, ShoppingBag, ChefHat, Link as LinkIcon, 
  FileText, Shield, BookOpen, Calculator, DollarSign, ShoppingCart 
} from 'lucide-react';
import { AuthButton } from './AuthButton';
import { auth } from '../lib/firebase';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Navbar({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const user = auth.currentUser;
  const isAdmin = user?.email === 'admin@mushroomservice.com';
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for Snipcart cart changes
  useEffect(() => {
    if (window.Snipcart) {
      window.Snipcart.events.on('cart:ready', (cartState: any) => {
        setCartItemCount(cartState.items.count);
      });
      window.Snipcart.events.on('cart:itemadded', (cartState: any) => {
        setCartItemCount(cartState.items.count);
      });
      window.Snipcart.events.on('cart:itemremoved', (cartState: any) => {
        setCartItemCount(cartState.items.count);
      });
    }
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sprout },
    { id: 'about', label: 'About', icon: Book },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'prices', label: 'Market Prices', icon: DollarSign },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'ebooks', label: 'Free Ebooks', icon: BookOpen },
    { id: 'tools', label: 'Tools', icon: Calculator },
    { id: 'links', label: 'Links', icon: LinkIcon },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Shield }] : []),
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-4">
            <Sprout className={`h-8 w-8 ${isScrolled ? 'text-amber-600' : 'text-white'}`} />
            <span className={`text-xl font-bold ${isScrolled ? 'text-amber-900' : 'text-white'}`}>
              MushRoomService    
            </span>
            
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? isScrolled ? 'text-amber-600' : 'text-amber-300'
                    : isScrolled ? 'text-gray-600 hover:text-amber-600' : 'text-white hover:text-amber-300'
                }`}
              >
                <item.icon className="h-5 w-5 mr-1" />
                {item.label}
              </button>
            ))}
            
            <div className="flex items-center space-x-4">
              <AuthButton isScrolled={isScrolled} />
              <button 
                className="snipcart-checkout flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Cart</span>
                {cartItemCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              className="snipcart-checkout flex items-center space-x-2"
            >
              <ShoppingCart className={`h-6 w-6 ${isScrolled ? 'text-amber-600' : 'text-white'}`} />
              {cartItemCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled ? 'text-gray-600 hover:text-amber-600' : 'text-white hover:text-amber-300'}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-amber-100 text-amber-600'
                    : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.label}
              </button>
            ))}
            <div className="px-3 py-2">
              <AuthButton isScrolled={true} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}