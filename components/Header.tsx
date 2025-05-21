
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { APP_NAME, ROUTES, ShoppingCartIcon, UserIcon, SearchIcon, MenuIcon, XMarkIcon } from '../constants';

const Header: React.FC = () => {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'Products', path: ROUTES.PRODUCTS },
    { name: 'About Us', path: ROUTES.ABOUT },
    { name: 'Contact', path: ROUTES.CONTACT },
  ];

  return (
    <header className="bg-neutral-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="text-2xl font-bold text-primary-light hover:text-primary transition-colors">
          {APP_NAME}
        </Link>

        {/* Desktop Navigation & Search */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} className="hover:text-primary-light transition-colors">
              {link.name}
            </Link>
          ))}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="px-3 py-2 rounded-md bg-neutral-700 text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary focus:outline-none text-sm"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white">
              <SearchIcon className="w-5 h-5" />
            </button>
          </form>
        </nav>

        {/* Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to={ROUTES.ACCOUNT} className="hover:text-primary-light transition-colors" aria-label="Account">
            <UserIcon className="w-6 h-6" />
          </Link>
          <Link to={ROUTES.CART} className="relative hover:text-primary-light transition-colors" aria-label="Shopping Cart">
            <ShoppingCartIcon className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-800 absolute w-full left-0 top-full shadow-lg py-2">
          <nav className="flex flex-col items-center space-y-3 px-4 py-2">
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="block py-2 hover:text-primary-light transition-colors w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <form onSubmit={handleSearch} className="relative w-full max-w-xs mt-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 rounded-md bg-neutral-700 text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary focus:outline-none text-sm"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white">
                <SearchIcon className="w-5 h-5" />
              </button>
            </form>
            <div className="flex justify-center space-x-6 pt-4">
                <Link to={ROUTES.ACCOUNT} className="hover:text-primary-light transition-colors" aria-label="Account" onClick={() => setIsMobileMenuOpen(false)}>
                    <UserIcon className="w-7 h-7" />
                </Link>
                <Link to={ROUTES.CART} className="relative hover:text-primary-light transition-colors" aria-label="Shopping Cart" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShoppingCartIcon className="w-7 h-7" />
                    {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                    </span>
                    )}
                </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
