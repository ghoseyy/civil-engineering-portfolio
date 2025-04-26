'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRefresh } from '../context/RefreshContext';

interface HeroContent {
  title: {
    part1: string;
    part2: string;
  };
  description: string;
  cta: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
  image: string;
}

export default function Hero() {
  const [content, setContent] = useState<HeroContent | null>(null);
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
        setContent(data.hero);
      } catch (err) {
        console.error('Error fetching hero content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [refreshKey]);

  if (isLoading || !content) {
    return (
      <section id="home" className="gradient-bg min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="animate-pulse">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="gradient-bg min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="hero-text text-4xl md:text-6xl font-bold mb-6">
              {content.title.part1}, <span className="text-theme-primary">{content.title.part2}</span>
            </h1>
            <p className="text-lg mb-8 whitespace-pre-line">{content.description}</p>
            <div className="flex space-x-4">
              <a 
                href={content.cta.primary.link} 
                className="bg-theme-primary hover:opacity-90 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg"
              >
                {content.cta.primary.text}
              </a>
              <a 
                href={content.cta.secondary.link} 
                className="relative border-2 border-theme-primary text-theme-primary px-6 py-3 rounded-full font-medium transition-all overflow-hidden group"
              >
                <span className="relative z-10">{content.cta.secondary.text}</span>
                <div className="absolute inset-0 bg-theme-primary opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-theme-primary rounded-full opacity-20 blur-xl"></div>
              <div className="relative card-3d floating">
                <Image
                  src={content.image}
                  alt="Profile"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover rounded-full border-8 border-white shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 