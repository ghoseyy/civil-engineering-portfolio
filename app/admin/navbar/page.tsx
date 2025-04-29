'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface NavItem {
  id: string;
  href: string;
  label: string;
}

export default function NavbarCustomization() {
  const { name: currentName, updateTheme } = useTheme();
  const [navbarName, setNavbarName] = useState(currentName);
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: '1', href: '/', label: 'Home' },
    { id: '2', href: '#about', label: 'About' },
    { id: '3', href: '#projects', label: 'Projects' },
    { id: '4', href: '#skills', label: 'Skills' },
    { id: '5', href: '#contact', label: 'Contact' }
  ]);

  useEffect(() => {
    // Load saved navigation configuration
    const savedConfig = localStorage.getItem('navbarConfig');
    if (savedConfig) {
      try {
        const { name, items } = JSON.parse(savedConfig);
        if (name) setNavbarName(name);
        if (Array.isArray(items)) setNavItems(items);
      } catch (error) {
        console.error('Error loading navbar configuration:', error);
      }
    }
  }, []);

  const handleNameChange = (value: string) => {
    setNavbarName(value);
  };

  const handleNavItemChange = (id: string, field: 'href' | 'label', value: string) => {
    setNavItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addNavItem = () => {
    const newId = String(navItems.length + 1);
    setNavItems(prev => [...prev, { id: newId, href: '#new', label: 'New Item' }]);
  };

  const removeNavItem = (id: string) => {
    setNavItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      name: navbarName,
      items: navItems
    };
    localStorage.setItem('navbarConfig', JSON.stringify(config));
    
    // Update theme context with new name
    const currentTheme = JSON.parse(localStorage.getItem('theme') || '{}');
    const updatedTheme = {
      ...currentTheme,
      name: navbarName
    };
    localStorage.setItem('theme', JSON.stringify(updatedTheme));
    updateTheme(updatedTheme);

    // Dispatch a custom event to notify components of the change
    const event = new Event('storage');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Navigation Customization</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Navbar Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Website Name
              </label>
              <input
                type="text"
                value={navbarName}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter website name"
              />
            </div>

            {/* Navigation Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Menu Items</h2>
                <button
                  type="button"
                  onClick={addNavItem}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Add Menu Item
                </button>
              </div>
              
              <div className="space-y-4">
                {navItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Menu Label
                        </label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleNavItemChange(item.id, 'label', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-2 mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Link (href)
                        </label>
                        <input
                          type="text"
                          value={item.href}
                          onChange={(e) => handleNavItemChange(item.id, 'href', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNavItem(item.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="mt-8 p-6 border rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Navigation Preview</h2>
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-xl font-bold mb-4">{navbarName}</div>
                <div className="flex gap-4">
                  {navItems.map((item) => (
                    <div key={item.id} className="text-sm text-gray-500 hover:text-purple-600 cursor-pointer">
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 