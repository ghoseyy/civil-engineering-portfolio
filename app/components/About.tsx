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
  name: string;
  iconStyles?: {
    backgroundColor?: string;
    backgroundOpacity?: number;
    iconColor?: string;
  };
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
      <section id="about" className="py-20 bg-[var(--color-light-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-[var(--color-light-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="hero-text text-3xl md:text-4xl font-bold mb-4">{content.title || 'About Me'}</h2>
          <div className="w-20 h-1 bg-theme-primary mx-auto"></div>
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
            <h3 className="text-2xl font-bold mb-4">{content.name}</h3>
            <p className="text-theme-primary font-medium mb-6">{content.subtitle}</p>
            <p className="text-[var(--color-text)] mb-4 whitespace-pre-line">{content.content}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="relative p-2 rounded-full mr-3" style={{ isolation: 'isolate' }}>
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: content.iconStyles?.backgroundColor || 'var(--color-primary)',
                      opacity: (content.iconStyles?.backgroundOpacity || 10) / 100,
                      borderRadius: '9999px',
                      zIndex: -1,
                    }}
                  />
                  <i className="fas fa-graduation-cap" style={{ color: content.iconStyles?.iconColor || 'var(--color-primary)' }}></i>
                </div>
                <div>
                  <p className="font-medium">Education</p>
                  <p className="text-sm text-[var(--color-text)] opacity-75">{content.education}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative p-2 rounded-full mr-3" style={{ isolation: 'isolate' }}>
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: content.iconStyles?.backgroundColor || 'var(--color-primary)',
                      opacity: (content.iconStyles?.backgroundOpacity || 10) / 100,
                      borderRadius: '9999px',
                      zIndex: -1,
                    }}
                  />
                  <i className="fas fa-map-marker-alt" style={{ color: content.iconStyles?.iconColor || 'var(--color-primary)' }}></i>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-[var(--color-text)] opacity-75">{content.location}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative p-2 rounded-full mr-3" style={{ isolation: 'isolate' }}>
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: content.iconStyles?.backgroundColor || 'var(--color-primary)',
                      opacity: (content.iconStyles?.backgroundOpacity || 10) / 100,
                      borderRadius: '9999px',
                      zIndex: -1,
                    }}
                  />
                  <i className="fas fa-heart" style={{ color: content.iconStyles?.iconColor || 'var(--color-primary)' }}></i>
                </div>
                <div>
                  <p className="font-medium">Interests</p>
                  <p className="text-sm text-[var(--color-text)] opacity-75">{content.interests}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative p-2 rounded-full mr-3" style={{ isolation: 'isolate' }}>
                  <span
                    style={{
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: content.iconStyles?.backgroundColor || 'var(--color-primary)',
                      opacity: (content.iconStyles?.backgroundOpacity || 10) / 100,
                      borderRadius: '9999px',
                      zIndex: -1,
                    }}
                  />
                  <i className="fas fa-briefcase" style={{ color: content.iconStyles?.iconColor || 'var(--color-primary)' }}></i>
                </div>
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-sm text-[var(--color-text)] opacity-75">{content.experience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 