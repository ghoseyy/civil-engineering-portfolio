'use client';

import { useState, useEffect } from 'react';
import { useRefresh } from '../context/RefreshContext';
import Link from 'next/link';

interface FooterContent {
  title: string;
  subtitle: string;
  social: {
    linkedin: string;
    github: string;
    instagram: string;
    twitter: string;
  };
  bottomLinks: {
    label: string;
    url: string;
  }[];
  copyright: string;
}

export default function Footer() {
  const [content, setContent] = useState<FooterContent | null>(null);
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
        setContent(data.footer);
      } catch (err) {
        console.error('Error fetching footer content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [refreshKey]);

  if (isLoading || !content) {
    return null;
  }

  return (
    <footer className="bg-[#0B1121] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-purple-400">{content.title}</h2>
            <p className="text-gray-400 mt-2">{content.subtitle}</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href={content.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a 
              href={content.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a 
              href={content.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a 
              href={content.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">{content.copyright}</p>
          <div className="flex space-x-6">
            {content.bottomLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 