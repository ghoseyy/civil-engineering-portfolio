'use client';

import { useState, useEffect } from 'react';

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  icons: {
    arrow: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
  };
}

export default function ThemeAdmin() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetch('/api/theme');
        if (!response.ok) {
          throw new Error('Failed to fetch theme');
        }
        const data = await response.json();
        setTheme(data);
        setError(null);
      } catch (err) {
        setError('Failed to load theme. Please try again later.');
        console.error('Error fetching theme:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/theme', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(theme),
      });

      if (!response.ok) {
        throw new Error('Failed to update theme');
      }

      alert('Theme updated successfully!');
    } catch (err) {
      console.error('Error saving theme:', err);
      alert('Failed to save theme. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!theme) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Theme data not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Customize Theme</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(theme.colors).map(([key, value]) => (
              <div key={key}>
                <label htmlFor={`color-${key}`} className="block text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <div className="mt-1 flex">
                  <input
                    type="color"
                    id={`color-${key}`}
                    value={value}
                    onChange={(e) => setTheme({
                      ...theme,
                      colors: { ...theme.colors, [key]: e.target.value }
                    })}
                    className="h-10 w-10 rounded-l-md border-gray-300"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setTheme({
                      ...theme,
                      colors: { ...theme.colors, [key]: e.target.value }
                    })}
                    className="flex-1 rounded-r-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Fonts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(theme.fonts).map(([key, value]) => (
              <div key={key}>
                <label htmlFor={`font-${key}`} className="block text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <select
                  id={`font-${key}`}
                  value={value}
                  onChange={(e) => setTheme({
                    ...theme,
                    fonts: { ...theme.fonts, [key]: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Montserrat">Montserrat</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(theme.icons).map(([key, value]) => (
              <div key={key}>
                <label htmlFor={`icon-${key}`} className="block text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <select
                  id={`icon-${key}`}
                  value={value}
                  onChange={(e) => setTheme({
                    ...theme,
                    icons: { ...theme.icons, [key]: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="fas fa-arrow-right">Arrow Right</option>
                  <option value="fas fa-envelope">Envelope</option>
                  <option value="fas fa-phone">Phone</option>
                  <option value="fas fa-map-marker-alt">Location</option>
                  <option value="fab fa-github">GitHub</option>
                  <option value="fab fa-linkedin">LinkedIn</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 