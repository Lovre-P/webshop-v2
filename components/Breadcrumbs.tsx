
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  const allItems = [{ name: 'Home', path: ROUTES.HOME }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-600">
      <ol className="list-none p-0 inline-flex flex-wrap">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.path && index < allItems.length -1 ? (
              <Link to={item.path} className="hover:text-primary hover:underline">
                {item.name}
              </Link>
            ) : (
              <span className={index === allItems.length -1 ? "text-neutral-800 font-medium" : ""}>{item.name}</span>
            )}
            {index < allItems.length - 1 && (
              <span className="mx-2 text-neutral-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
