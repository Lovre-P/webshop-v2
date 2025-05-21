
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { ROUTES, PLACEHOLDER_IMAGE_URL } from '../constants';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <img 
        src={PLACEHOLDER_IMAGE_URL(400,300)} 
        alt="Page not found illustration" 
        className="mx-auto mb-8 h-64 rounded-lg shadow-md"
      />
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-neutral-800 mb-6">Oops! Page Not Found</h2>
      <p className="text-neutral-600 text-lg mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to={ROUTES.HOME}>
        <Button variant="primary" size="lg">Go to Homepage</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
