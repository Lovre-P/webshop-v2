
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import Spinner from '../components/Spinner';
// Fix: Import ROUTES from ../constants
import { MOCK_PRODUCTS, MOCK_CATEGORIES, ChevronDownIcon, ROUTES } from '../constants';
import { Product } from '../types';
import Button from '../components/Button';

const ITEMS_PER_PAGE = 8;

const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'name_asc');
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') || '1', 10));
  
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filteredProducts = MOCK_PRODUCTS;

      if (selectedCategory) {
        const categoryObj = MOCK_CATEGORIES.find(c => c.id === selectedCategory);
        if(categoryObj) {
          filteredProducts = filteredProducts.filter(p => p.category === categoryObj.name);
        }
      }
      
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sorting
      filteredProducts.sort((a, b) => {
        switch (sortBy) {
          case 'price_asc': return a.price - b.price;
          case 'price_desc': return b.price - a.price;
          case 'name_asc': return a.name.localeCompare(b.name);
          case 'name_desc': return b.name.localeCompare(a.name);
          case 'rating_desc': return (b.rating || 0) - (a.rating || 0);
          default: return 0;
        }
      });

      setProducts(filteredProducts);
      setIsLoading(false);
    }, 500);
  }, [selectedCategory, sortBy, searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortBy) params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (searchTerm) params.set('search', searchTerm);
    setSearchParams(params, { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, sortBy, currentPage, searchTerm]);


  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const breadcrumbItems = [{ name: 'Products' }];
  if (selectedCategory) {
    const cat = MOCK_CATEGORIES.find(c => c.id === selectedCategory);
    if (cat) breadcrumbItems.push({ name: cat.name });
  }


  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><Spinner size="lg" /></div>;
  }

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-3xl font-bold text-neutral-800 mb-2">
        {selectedCategory ? MOCK_CATEGORIES.find(c=>c.id === selectedCategory)?.name : 'All Products'}
        {searchTerm && <span className="text-xl font-normal"> (Search: "{searchTerm}")</span>}
      </h1>
      <p className="text-neutral-600 mb-8">Browse our collection of high-quality products. Use the filters to find exactly what you're looking for.</p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <Sidebar 
            categories={MOCK_CATEGORIES} 
            currentCategory={selectedCategory}
            onCategorySelect={handleCategorySelect} 
          />
        </div>
        <div className="w-full md:w-3/4">
          {/* Sorting and Info */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-neutral-600 mb-2 sm:mb-0">
              Showing {paginatedProducts.length} of {products.length} products
            </p>
            <div className="relative">
              <select 
                value={sortBy} 
                onChange={handleSortChange}
                className="appearance-none bg-neutral-100 border border-neutral-300 text-neutral-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              >
                <option value="name_asc">Sort by Name (A-Z)</option>
                <option value="name_desc">Sort by Name (Z-A)</option>
                <option value="price_asc">Sort by Price (Low to High)</option>
                <option value="price_desc">Sort by Price (High to Low)</option>
                <option value="rating_desc">Sort by Rating</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700">
                <ChevronDownIcon className="w-4 h-4"/>
              </div>
            </div>
          </div>

          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <img src="assets/images/no-results.svg" alt="No products found" className="mx-auto h-40 mb-4" /> {/* Add a relevant SVG or image */}
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">No Products Found</h3>
              <p className="text-neutral-500 mb-4">
                We couldn't find any products matching your criteria. Try adjusting your filters or search term.
              </p>
              <Link to={ROUTES.PRODUCTS}>
                <Button variant="primary">Clear Filters</Button>
              </Link>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center items-center space-x-2">
              <Button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                 (pageNumber === 1 || pageNumber === totalPages || Math.abs(pageNumber - currentPage) <=1 || (totalPages > 5 && (pageNumber === currentPage-2 || pageNumber === currentPage+2))) ? (
                    <Button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        variant={currentPage === pageNumber ? 'primary' : 'ghost'}
                        size="sm"
                        className={`min-w-[36px] ${ (Math.abs(pageNumber - currentPage) === 2 && totalPages > 5 ) ? 'hidden sm:inline-flex' : '' }`}
                    >
                        {pageNumber}
                    </Button>
                 ) : ( (pageNumber === currentPage-3 || pageNumber === currentPage+3) && totalPages > 5 ) ? (
                    <span key={`dots-${pageNumber}`} className="px-2 py-1 text-sm text-neutral-500 hidden sm:inline-flex">...</span>
                 ) : null
              ))}
              <Button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;