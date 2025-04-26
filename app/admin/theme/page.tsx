'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  lightBg: string;
}

interface ThemeSection {
  id: string;
  label: string;
  useGlobalColors: boolean;
  colors: {
    background: string;
    text: string;
    accent: string;
  };
}

export default function ThemeCustomization() {
  const { colors: currentColors, name, updateTheme } = useTheme();
  
  // Global color palette
  const [globalColors, setGlobalColors] = useState<ColorPalette>({
    primary: currentColors.primary,
    secondary: currentColors.secondary,
    accent: currentColors.accent,
    background: '#ffffff',
    text: '#1f2937',
    lightBg: '#f9fafb'
  });

  const [sections, setSections] = useState<ThemeSection[]>([
    {
      id: 'hero',
      label: 'Hero Section',
      useGlobalColors: true,
      colors: {
        background: '#ffffff',
        text: '#1f2937',
        accent: '#7c3aed'
      }
    },
    {
      id: 'about',
      label: 'About Section',
      useGlobalColors: true,
      colors: {
        background: '#f9fafb',
        text: '#1f2937',
        accent: '#7c3aed'
      }
    },
    {
      id: 'projects',
      label: 'Projects Section',
      useGlobalColors: true,
      colors: {
        background: '#ffffff',
        text: '#1f2937',
        accent: '#7c3aed'
      }
    },
    {
      id: 'skills',
      label: 'Skills Section',
      useGlobalColors: true,
      colors: {
        background: '#f9fafb',
        text: '#1f2937',
        accent: '#7c3aed'
      }
    },
    {
      id: 'contact',
      label: 'Contact Section',
      useGlobalColors: true,
      colors: {
        background: '#ffffff',
        text: '#1f2937',
        accent: '#7c3aed'
      }
    }
  ]);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        if (parsedTheme.colors) {
          setGlobalColors({
            ...globalColors,
            primary: parsedTheme.colors.primary,
            secondary: parsedTheme.colors.secondary,
            accent: parsedTheme.colors.accent,
          });
        }
      } catch (error) {
        console.error('Error loading theme configuration:', error);
      }
    }
  }, []);

  const handleGlobalColorChange = (colorKey: keyof ColorPalette, value: string) => {
    setGlobalColors(prev => ({
      ...prev,
      [colorKey]: value
    }));

    // Update all sections that use global colors
    setSections(prev => prev.map(section => {
      if (!section.useGlobalColors) return section;

      const newColors = {
        background: colorKey === 'background' ? value : 
                   (section.colors.background === globalColors.background ? value : section.colors.background),
        text: colorKey === 'text' ? value : section.colors.text,
        accent: colorKey === 'accent' ? value : section.colors.accent
      };

      return {
        ...section,
        colors: newColors
      };
    }));
  };

  const handleSectionColorChange = (sectionId: string, colorKey: string, value: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, colors: { ...section.colors, [colorKey]: value } }
          : section
      )
    );
  };

  const toggleGlobalColors = (sectionId: string) => {
    setSections(prev =>
      prev.map(section => {
        if (section.id !== sectionId) return section;
        
        const useGlobalColors = !section.useGlobalColors;
        return {
          ...section,
          useGlobalColors,
          colors: useGlobalColors ? {
            background: section.id === 'about' || section.id === 'skills' ? globalColors.lightBg : globalColors.background,
            text: globalColors.text,
            accent: globalColors.accent
          } : section.colors
        };
      })
    );
  };

  const applyColors = () => {
    document.documentElement.style.setProperty('--color-primary', globalColors.primary);
    document.documentElement.style.setProperty('--color-secondary', globalColors.secondary);
    document.documentElement.style.setProperty('--color-accent', globalColors.accent);
    document.documentElement.style.setProperty('--color-background', globalColors.background);
    document.documentElement.style.setProperty('--color-text', globalColors.text);
    document.documentElement.style.setProperty('--color-light-bg', globalColors.lightBg);
  };

  // Save theme changes
  const handleSave = () => {
    // Update theme context
    updateTheme({
      colors: {
        primary: globalColors.primary,
        secondary: globalColors.secondary,
        accent: globalColors.accent,
      },
      name: name
    });

    // Update CSS variables for additional colors
    document.documentElement.style.setProperty('--color-background', globalColors.background);
    document.documentElement.style.setProperty('--color-text', globalColors.text);
    document.documentElement.style.setProperty('--color-light-bg', globalColors.lightBg);

    alert('Theme updated successfully!');
  };

  // Preview Components
  const PreviewButton = ({ color }: { color: string }) => (
    <button
      style={{ backgroundColor: color }}
      className="px-4 py-2 rounded-md text-white shadow-sm w-full hover:opacity-90 transition-opacity"
    >
      Button
    </button>
  );

  const PreviewCard = ({ section }: { section: ThemeSection }) => (
    <div
      style={{ 
        backgroundColor: section.useGlobalColors 
          ? (section.id === 'about' || section.id === 'skills' ? globalColors.lightBg : globalColors.background)
          : section.colors.background
      }}
      className="p-4 rounded-lg shadow-sm"
    >
      <h3 
        style={{ 
          color: section.useGlobalColors ? globalColors.text : section.colors.text 
        }} 
        className="text-lg font-semibold mb-2"
      >
        {section.label}
      </h3>
      <p 
        style={{ 
          color: section.useGlobalColors ? globalColors.text : section.colors.text 
        }} 
        className="text-sm mb-3 opacity-80"
      >
        This is a preview of how your content will look with these colors.
      </p>
      <button
        style={{ 
          backgroundColor: section.useGlobalColors ? globalColors.accent : section.colors.accent 
        }}
        className="px-3 py-1 rounded text-white text-sm hover:opacity-90 transition-opacity"
      >
        Action
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Theme Customization</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Global Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={globalColors.primary}
                onChange={(e) => setGlobalColors({ ...globalColors, primary: e.target.value })}
                className="h-10 w-20"
              />
              <input
                type="text"
                value={globalColors.primary}
                onChange={(e) => setGlobalColors({ ...globalColors, primary: e.target.value })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={globalColors.secondary}
                onChange={(e) => setGlobalColors({ ...globalColors, secondary: e.target.value })}
                className="h-10 w-20"
              />
              <input
                type="text"
                value={globalColors.secondary}
                onChange={(e) => setGlobalColors({ ...globalColors, secondary: e.target.value })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accent Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={globalColors.accent}
                onChange={(e) => setGlobalColors({ ...globalColors, accent: e.target.value })}
                className="h-10 w-20"
              />
              <input
                type="text"
                value={globalColors.accent}
                onChange={(e) => setGlobalColors({ ...globalColors, accent: e.target.value })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={globalColors.background}
                onChange={(e) => setGlobalColors({ ...globalColors, background: e.target.value })}
                className="h-10 w-20"
              />
              <input
                type="text"
                value={globalColors.background}
                onChange={(e) => setGlobalColors({ ...globalColors, background: e.target.value })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={globalColors.text}
                onChange={(e) => setGlobalColors({ ...globalColors, text: e.target.value })}
                className="h-10 w-20"
              />
              <input
                type="text"
                value={globalColors.text}
                onChange={(e) => setGlobalColors({ ...globalColors, text: e.target.value })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Light Background Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={globalColors.lightBg}
                onChange={(e) => setGlobalColors({ ...globalColors, lightBg: e.target.value })}
                className="h-10 w-20"
              />
              <input
                type="text"
                value={globalColors.lightBg}
                onChange={(e) => setGlobalColors({ ...globalColors, lightBg: e.target.value })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="space-y-6">
          <div style={{ backgroundColor: globalColors.background }} className="p-6 rounded-lg">
            <h3 style={{ color: globalColors.text }} className="text-lg font-semibold mb-4">Content Preview</h3>
            <p style={{ color: globalColors.text }} className="mb-4">This is how your content will look with the selected colors.</p>
            <div className="space-y-4">
              <button
                style={{ backgroundColor: globalColors.primary }}
                className="px-4 py-2 text-white rounded-md hover:opacity-90"
              >
                Primary Button
              </button>
              <button
                style={{ backgroundColor: globalColors.secondary }}
                className="px-4 py-2 text-white rounded-md hover:opacity-90 ml-4"
              >
                Secondary Button
              </button>
              <div
                style={{ backgroundColor: globalColors.accent }}
                className="px-4 py-2 text-white rounded-md inline-block ml-4"
              >
                Accent Element
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
} 