
import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import { PLACEHOLDER_IMAGE_URL } from '../constants';
import Notification from '../components/Notification';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form data submitted:', formData);
    setNotification({message: 'Your message has been sent successfully!', type: 'success'});
    setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    setIsSubmitting(false);
  };
  
  const InputField: React.FC<{label: string, id: string, name: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean, autoComplete?: string}> = 
    ({label, id, name, type="text", value, onChange, required=false, autoComplete}) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      <input type={type} id={id} name={name} value={value} onChange={onChange} required={required} autoComplete={autoComplete}
             className="w-full p-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
    </div>
  );


  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      <Breadcrumbs items={[{ name: 'Contact Us' }]} />
      <h1 className="text-4xl font-bold text-center text-neutral-800 mb-10">Get In Touch</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <section className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField label="Full Name" id="name" name="name" value={formData.name} onChange={handleInputChange} required autoComplete="name" />
            <InputField label="Email Address" id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required autoComplete="email" />
            <InputField label="Subject" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message<span className="text-red-500">*</span></label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                value={formData.message} 
                onChange={handleInputChange} 
                required
                className="w-full p-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              ></textarea>
            </div>
            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </section>

        {/* Contact Information & Map */}
        <section className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Contact Information</h2>
            <ul className="space-y-3 text-neutral-600">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>123 Webshop Lane, Suite 100<br/>Cityville, ST 12345</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:support@modernwebshop.com" className="hover:text-primary">support@modernwebshop.com</a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.308 1.154a11.034 11.034 0 005.37 5.37l1.154-2.308a1 1 0 011.21-.502l4.493 1.498A1 1 0 0119.72 19h3.28a2 2 0 01-2 2 19.99 19.99 0 01-8.63-3.07 19.5 19.5 0 01-6.33-6.33A19.99 19.99 0 013 5z" /></svg>
                <a href="tel:+1234567890" className="hover:text-primary">(123) 456-7890</a>
              </li>
            </ul>
             <div className="mt-6">
                <h3 className="text-lg font-medium text-neutral-700 mb-2">Working Hours</h3>
                <p className="text-neutral-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-neutral-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-neutral-600">Sunday: Closed</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Placeholder for map - In a real app, embed Google Maps or similar */}
            <img src={PLACEHOLDER_IMAGE_URL(600,400)} alt="Our Location" className="w-full h-64 object-cover"/>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
