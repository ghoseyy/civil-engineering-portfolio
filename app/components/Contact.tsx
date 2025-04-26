'use client';

import { useState, useEffect } from 'react';
import { useRefresh } from '../context/RefreshContext';

interface ContactItem {
  icon: string;
  label: string;
  value: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

interface ContactContent {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  contactItems: ContactItem[];
  socialLinks: SocialLink[];
}

export default function Contact() {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data.contact);
      } catch (err) {
        console.error('Error fetching contact content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [refreshKey]);

  if (isLoading || !content) {
    return (
      <section id="contact" className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="hero-text text-3xl md:text-4xl font-bold text-gray-800 mb-4">{content.title}</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{content.subtitle}</h3>
              <p className="text-gray-600 mb-8">{content.description}</p>
              
              <div className="space-y-4">
                {content.contactItems.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <i className={`${item.icon} text-purple-600`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">{item.label}</h4>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="flex space-x-4">
                  {content.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${link.color} hover:opacity-90 text-white p-3 rounded-full transition-all transform hover:scale-110`}
                      title={link.name}
                    >
                      <i className={`${link.icon} text-lg`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 md:p-12">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all" placeholder="John Doe" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all" placeholder="john@example.com" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all" placeholder="Project Inquiry" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all" placeholder="Tell me about your project..."></textarea>
                </div>
                
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 