'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

interface NavItem {
  id: string;
  href: string;
  label: string;
}

const Navigation = () => {
  const { name, colors } = useTheme();
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: '1', href: '/', label: 'Home' },
    { id: '2', href: '#about', label: 'About' },
    { id: '3', href: '#projects', label: 'Projects' },
    { id: '4', href: '#skills', label: 'Skills' },
    { id: '5', href: '#contact', label: 'Contact' }
  ]);

  // Function to load navbar configuration
  const loadNavConfig = () => {
    const savedNavConfig = localStorage.getItem('navbarConfig');
    if (savedNavConfig) {
      try {
        const { items } = JSON.parse(savedNavConfig);
        if (Array.isArray(items)) {
          setNavItems(items);
        }
      } catch (error) {
        console.error('Error loading navbar configuration:', error);
      }
    }
  };

  // Load initial configuration
  useEffect(() => {
    loadNavConfig();
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'navbarConfig') {
        loadNavConfig();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span 
                className="text-xl font-bold transition-colors" 
                style={{ color: colors.primary }}
              >
                {name}
              </span>
            </Link>
          </div>
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 transition-colors hover:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 