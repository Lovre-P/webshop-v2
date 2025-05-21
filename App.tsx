
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ROUTES } from './constants';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
// Optional Pages (stubs for now)
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import AccountPage from './pages/AccountPage';
// import FAQPage from './pages/FAQPage';
// import BlogPage from './pages/BlogPage';
// import BlogPostPage from './pages/BlogPostPage';
// import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
// import TermsOfServicePage from './pages/TermsOfServicePage';

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.PRODUCTS} element={<ProductListPage />} />
              <Route path={ROUTES.PRODUCT_DETAIL.replace(':id', ':productId')} element={<ProductDetailPage />} />
              <Route path={ROUTES.CART} element={<CartPage />} />
              <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
              <Route path={ROUTES.ORDER_SUCCESS} element={<OrderSuccessPage />} />
              <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
              <Route path={ROUTES.CONTACT} element={<ContactPage />} />
              
              {/* Example redirect for product detail if ID is part of category route */}
              <Route path="/products/:category/:productId" element={<ProductDetailPage />} />

              {/* Optional Page Routes - uncomment and implement if needed */}
              {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} /> */}
              {/* <Route path={ROUTES.REGISTER} element={<RegisterPage />} /> */}
              {/* <Route path={ROUTES.ACCOUNT} element={<AccountPage />} /> */}
              {/* <Route path={ROUTES.FAQ} element={<FAQPage />} /> */}
              {/* <Route path={ROUTES.BLOG} element={<BlogPage />} /> */}
              {/* <Route path={ROUTES.BLOG_POST.replace(':id', ':postId')} element={<BlogPostPage />} /> */}
              {/* <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicyPage />} /> */}
              {/* <Route path={ROUTES.TERMS_OF_SERVICE} element={<TermsOfServicePage />} /> */}

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
