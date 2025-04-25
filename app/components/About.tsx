'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRefresh } from '../context/RefreshContext';

interface AboutContent {
  title: string;
  content: string;
  image: string;
  education: string;
  location: string;
  interests: string;
  experience: string;
  subtitle: string;
}

export default function About() {
  const [content, setContent] = useState<AboutContent | null>(null);
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
        setContent(data.about);
      } catch (err) {
        console.error('Error fetching about content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [refreshKey]);

  if (isLoading || !content) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="hero-text text-3xl md:text-4xl font-bold text-gray-800 mb-4">{content.title}</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
            <div className="card-3d" data-tilt data-tilt-max="15" data-tilt-speed="400" data-tilt-perspective="1000">
              <Image
                src={content.image}
                alt="Profile"
                width={320}
                height={320}
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Sandhya Thapa</h3>
            <p className="text-purple-600 font-medium mb-6">{content.subtitle}</p>
            <p className="text-gray-600 mb-4 whitespace-pre-line">{content.content}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <i className="fas fa-graduation-cap text-purple-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Education</p>
                  <p className="text-sm text-gray-500">{content.education}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <i className="fas fa-map-marker-alt text-purple-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Location</p>
                  <p className="text-sm text-gray-500">{content.location}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <i className="fas fa-heart text-purple-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Interests</p>
                  <p className="text-sm text-gray-500">{content.interests}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <i className="fas fa-briefcase text-purple-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Experience</p>
                  <p className="text-sm text-gray-500">{content.experience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 