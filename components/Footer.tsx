
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, ROUTES } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-neutral-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{APP_NAME}</h3>
            <p className="text-sm text-neutral-400">
              Your one-stop shop for amazing products. We are committed to providing quality and customer satisfaction.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to={ROUTES.HOME} className="hover:text-primary-light transition-colors text-sm">Home</Link></li>
              <li><Link to={ROUTES.PRODUCTS} className="hover:text-primary-light transition-colors text-sm">Products</Link></li>
              <li><Link to={ROUTES.ABOUT} className="hover:text-primary-light transition-colors text-sm">About Us</Link></li>
              <li><Link to={ROUTES.CONTACT} className="hover:text-primary-light transition-colors text-sm">Contact</Link></li>
              <li><Link to={ROUTES.FAQ} className="hover:text-primary-light transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to={ROUTES.PRIVACY_POLICY} className="hover:text-primary-light transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to={ROUTES.TERMS_OF_SERVICE} className="hover:text-primary-light transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-neutral-400">123 Webshop Lane, Suite 100</li>
              <li className="text-neutral-400">Cityville, ST 12345</li>
              <li className="text-neutral-400">Email: support@modernwebshop.com</li>
              <li className="text-neutral-400">Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8 text-center">
          <p className="text-sm text-neutral-400">
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
          {/* Optional: Social Media Icons can be added here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
