
import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { PLACEHOLDER_IMAGE_URL, LOREM_IPSUM_LONG, LOREM_IPSUM_MEDIUM, APP_NAME } from '../constants';

const AboutUsPage: React.FC = () => {
  const teamMembers = [
    { name: 'Alice Wonderland', role: 'CEO & Founder', imageUrl: PLACEHOLDER_IMAGE_URL(150,150), bio: LOREM_IPSUM_MEDIUM.substring(0,100) + '...' },
    { name: 'Bob The Builder', role: 'Head of Product', imageUrl: PLACEHOLDER_IMAGE_URL(150,151), bio: LOREM_IPSUM_MEDIUM.substring(0,100) + '...' },
    { name: 'Charlie Chaplin', role: 'Marketing Lead', imageUrl: PLACEHOLDER_IMAGE_URL(150,152), bio: LOREM_IPSUM_MEDIUM.substring(0,100) + '...' },
  ];

  return (
    <div className="space-y-10">
      <Breadcrumbs items={[{ name: 'About Us' }]} />
      <h1 className="text-4xl font-bold text-center text-neutral-800 mb-10">About {APP_NAME}</h1>

      <section className="bg-white p-8 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-4">Our Story</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              {LOREM_IPSUM_LONG.substring(0, 400)}...
            </p>
            <p className="text-neutral-600 leading-relaxed">
              {LOREM_IPSUM_LONG.substring(400, 800)}...
            </p>
          </div>
          <img src={PLACEHOLDER_IMAGE_URL(500,350)} alt="Our company" className="rounded-lg shadow-md object-cover"/>
        </div>
      </section>

      <section className="bg-neutral-50 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">Our Mission & Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-medium text-neutral-700 mb-3">Mission</h3>
            <p className="text-neutral-600 leading-relaxed">{LOREM_IPSUM_MEDIUM}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-medium text-neutral-700 mb-3">Vision</h3>
            <p className="text-neutral-600 leading-relaxed">{LOREM_IPSUM_MEDIUM}</p>
          </div>
        </div>
      </section>
      
      <section className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(member => (
            <div key={member.name} className="text-center bg-neutral-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-sm object-cover"/>
              <h3 className="text-xl font-semibold text-neutral-800">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
              <p className="text-sm text-neutral-600 mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
