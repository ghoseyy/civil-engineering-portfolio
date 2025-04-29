'use client';

import { useState, useEffect } from 'react';
import { useRefresh } from '../../context/RefreshContext';

interface Content {
  hero: {
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
  };
  about: {
    title: string;
    name: string;
    content: string;
    image: string;
    education: string;
    location: string;
    interests: string;
    experience: string;
    subtitle: string;
    iconStyles?: {
      backgroundColor: string;
      backgroundOpacity: number;
      iconColor: string;
    };
  };
  projects: {
    tagStyles: {
      backgroundColor: string;
      backgroundOpacity: number;
      textColor: string;
    };
  };
  skills: {
    title: string;
    skillCategories: {
      name: string;
      icon: string;
      color: string;
    }[];
    technicalProficiencies: {
      title: string;
      categories: {
        name: string;
        icon: string;
        skills: {
          name: string;
          percentage: number;
        }[];
      }[];
    };
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    email: string;
    phone: string;
    location: string;
    contactItems: {
      icon: string;
      label: string;
      value: string;
    }[];
    socialLinks: {
      name: string;
      icon: string;
      url: string;
      color: string;
    }[];
  };
  footer: {
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
  };
}

export default function ContentAdmin() {
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'contact' | 'skills' | 'footer' | 'projects'>('hero');
  const { triggerRefresh } = useRefresh();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data);
        setError(null);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error('Error fetching content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error('Failed to update content');
      }

      triggerRefresh();
      alert('Content updated successfully!');
    } catch (err) {
      console.error('Error saving content:', err);
      alert('Failed to save content. Please try again.');
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

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Content data not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Content</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {(['hero', 'about', 'contact', 'skills', 'footer', 'projects'] as const).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`${
                  activeSection === section
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeSection === 'hero' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="hero-title-part1" className="block text-sm font-medium text-gray-700">
                Title Part 1
              </label>
              <input
                type="text"
                id="hero-title-part1"
                value={content.hero.title.part1}
                onChange={(e) => setContent({
                  ...content,
                  hero: { 
                    ...content.hero, 
                    title: { ...content.hero.title, part1: e.target.value } 
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="e.g., Building Dreams"
              />
            </div>
            <div>
              <label htmlFor="hero-title-part2" className="block text-sm font-medium text-gray-700">
                Title Part 2
              </label>
              <input
                type="text"
                id="hero-title-part2"
                value={content.hero.title.part2}
                onChange={(e) => setContent({
                  ...content,
                  hero: { 
                    ...content.hero, 
                    title: { ...content.hero.title, part2: e.target.value } 
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="e.g., Fyi with eyes closed 24/7"
              />
            </div>
            <div>
              <label htmlFor="hero-description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="hero-description"
                value={content.hero.description}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, description: e.target.value }
                })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Call to Action</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="hero-cta-primary-text" className="block text-sm font-medium text-gray-700">
                    Button Text
                  </label>
                  <input
                    type="text"
                    id="hero-cta-primary-text"
                    value={content.hero.cta.primary.text}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { 
                        ...content.hero, 
                        cta: { 
                          ...content.hero.cta, 
                          primary: { ...content.hero.cta.primary, text: e.target.value } 
                        } 
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="e.g., View Projects"
                  />
                </div>
                <div>
                  <label htmlFor="hero-cta-primary-link" className="block text-sm font-medium text-gray-700">
                    Link URL
                  </label>
                  <input
                    type="text"
                    id="hero-cta-primary-link"
                    value={content.hero.cta.primary.link}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { 
                        ...content.hero, 
                        cta: { 
                          ...content.hero.cta, 
                          primary: { ...content.hero.cta.primary, link: e.target.value } 
                        } 
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="e.g., #projects or https://example.com"
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Secondary Call to Action</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="hero-cta-secondary-text" className="block text-sm font-medium text-gray-700">
                    Button Text
                  </label>
                  <input
                    type="text"
                    id="hero-cta-secondary-text"
                    value={content.hero.cta.secondary.text}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { 
                        ...content.hero, 
                        cta: { 
                          ...content.hero.cta, 
                          secondary: { ...content.hero.cta.secondary, text: e.target.value } 
                        } 
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="e.g., Contact Me"
                  />
                </div>
                <div>
                  <label htmlFor="hero-cta-secondary-link" className="block text-sm font-medium text-gray-700">
                    Link URL
                  </label>
                  <input
                    type="text"
                    id="hero-cta-secondary-link"
                    value={content.hero.cta.secondary.link}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { 
                        ...content.hero, 
                        cta: { 
                          ...content.hero.cta, 
                          secondary: { ...content.hero.cta.secondary, link: e.target.value } 
                        } 
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="e.g., #contact or https://example.com"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="hero-image" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                id="hero-image"
                value={content.hero.image}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, image: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              <input
                type="text"
                value={content.about.image}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, image: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={content.about.name}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, name: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role/Title
              </label>
              <input
                type="text"
                value={content.about.subtitle}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, subtitle: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Enter your role or title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Content
              </label>
              <textarea
                value={content.about.content}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, content: e.target.value }
                })}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Enter your about content"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <input
                type="text"
                value={content.about.education}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, education: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Enter your education"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={content.about.location}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, location: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Enter your location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests
              </label>
              <input
                type="text"
                value={content.about.interests}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, interests: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Enter your interests"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              <input
                type="text"
                value={content.about.experience}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, experience: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Enter your experience"
              />
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Icon Styles</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <input
                    type="text"
                    value={content.about.iconStyles?.backgroundColor || 'var(--color-primary)'}
                    onChange={(e) => setContent({
                      ...content,
                      about: {
                        ...content.about,
                        iconStyles: {
                          ...content.about.iconStyles,
                          backgroundColor: e.target.value
                        }
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    placeholder="Enter color value (e.g., var(--color-primary))"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Opacity (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={content.about.iconStyles?.backgroundOpacity || 10}
                    onChange={(e) => setContent({
                      ...content,
                      about: {
                        ...content.about,
                        iconStyles: {
                          ...content.about.iconStyles,
                          backgroundOpacity: Number(e.target.value)
                        }
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon Color
                  </label>
                  <input
                    type="text"
                    value={content.about.iconStyles?.iconColor || 'var(--color-primary)'}
                    onChange={(e) => setContent({
                      ...content,
                      about: {
                        ...content.about,
                        iconStyles: {
                          ...content.about.iconStyles,
                          iconColor: e.target.value
                        }
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    placeholder="Enter color value (e.g., var(--color-primary))"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                  <div className="p-4 border rounded-lg flex items-center gap-4">
                    <div className="relative p-2 rounded-full" style={{ isolation: 'isolate' }}>
                      <span
                        style={{
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: content.about.iconStyles?.backgroundColor || 'var(--color-primary)',
                          opacity: (content.about.iconStyles?.backgroundOpacity || 10) / 100,
                          borderRadius: '9999px',
                          zIndex: -1,
                        }}
                      />
                      <i 
                        className="fas fa-graduation-cap"
                        style={{ color: content.about.iconStyles?.iconColor || 'var(--color-primary)' }}
                      ></i>
                    </div>
                    <span className="text-sm text-gray-600">Sample Icon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'projects' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Project Tag Styles</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <input
                    type="text"
                    value={content.projects?.tagStyles?.backgroundColor || 'var(--color-primary)'}
                    onChange={(e) => setContent({
                      ...content,
                      projects: {
                        ...content.projects,
                        tagStyles: {
                          ...content.projects?.tagStyles,
                          backgroundColor: e.target.value
                        }
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    placeholder="Enter color value (e.g., var(--color-primary))"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Opacity (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={content.projects?.tagStyles?.backgroundOpacity || 10}
                    onChange={(e) => setContent({
                      ...content,
                      projects: {
                        ...content.projects,
                        tagStyles: {
                          ...content.projects?.tagStyles,
                          backgroundOpacity: Number(e.target.value)
                        }
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <input
                    type="text"
                    value={content.projects?.tagStyles?.textColor || 'var(--color-primary)'}
                    onChange={(e) => setContent({
                      ...content,
                      projects: {
                        ...content.projects,
                        tagStyles: {
                          ...content.projects?.tagStyles,
                          textColor: e.target.value
                        }
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    placeholder="Enter color value (e.g., var(--color-primary))"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                  <div className="p-4 border rounded-lg">
                    <span
                      style={{
                        position: 'relative',
                        color: content.projects?.tagStyles?.textColor || 'var(--color-primary)',
                        isolation: 'isolate'
                      }}
                      className="inline-block px-3 py-1 rounded-full text-xs"
                    >
                      <span
                        style={{
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: content.projects?.tagStyles?.backgroundColor || 'var(--color-primary)',
                          opacity: (content.projects?.tagStyles?.backgroundOpacity || 10) / 100,
                          borderRadius: '9999px',
                          zIndex: -1,
                        }}
                      />
                      Sample Tag
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="space-y-8">
            <div>
              <label htmlFor="skills-title" className="block text-lg font-medium text-gray-900">
                Skills Section Title
              </label>
              <input
                type="text"
                id="skills-title"
                value={content.skills.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    skills: { ...content.skills, title: e.target.value },
                  })
                }
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            {/* Skill Categories Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Main Skill Categories</h3>
                <button
                  type="button"
                  onClick={() => {
                    const newCategories = [...content.skills.skillCategories];
                    newCategories.push({
                      name: 'New Category',
                      icon: 'fas fa-star',
                      color: 'text-purple-600'
                    });
                    setContent({
                      ...content,
                      skills: {
                        ...content.skills,
                        skillCategories: newCategories,
                      },
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Add Category
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.skills.skillCategories.map((category, index) => (
                  <div key={index} className="bg-white shadow rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={category.name}
                          onChange={(e) => {
                            const newCategories = [...content.skills.skillCategories];
                            newCategories[index] = { ...category, name: e.target.value };
                            setContent({
                              ...content,
                              skills: {
                                ...content.skills,
                                skillCategories: newCategories,
                              },
                            });
                          }}
                          className="w-full font-medium text-gray-900 border-0 focus:ring-0 p-0 bg-transparent"
                          placeholder="Category Name"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newCategories = content.skills.skillCategories.filter((_, i) => i !== index);
                          setContent({
                            ...content,
                            skills: {
                              ...content.skills,
                              skillCategories: newCategories,
                            },
                          });
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-500">Icon Class</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={category.icon}
                            onChange={(e) => {
                              const newCategories = [...content.skills.skillCategories];
                              newCategories[index] = { ...category, icon: e.target.value };
                              setContent({
                                ...content,
                                skills: {
                                  ...content.skills,
                                  skillCategories: newCategories,
                                },
                              });
                            }}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          />
                          <i className={`${category.icon} ${category.color} text-xl`}></i>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Color Class</label>
                        <input
                          type="text"
                          value={category.color}
                          onChange={(e) => {
                            const newCategories = [...content.skills.skillCategories];
                            newCategories[index] = { ...category, color: e.target.value };
                            setContent({
                              ...content,
                              skills: {
                                ...content.skills,
                                skillCategories: newCategories,
                              },
                            });
                          }}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Proficiencies Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Technical Proficiencies</h3>
                  <p className="text-sm text-gray-500 mt-1">Add your technical skills with proficiency levels</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newCategories = [...content.skills.technicalProficiencies.categories];
                    newCategories.push({
                      name: 'New Category',
                      icon: 'fas fa-code',
                      skills: []
                    });
                    setContent({
                      ...content,
                      skills: {
                        ...content.skills,
                        technicalProficiencies: {
                          ...content.skills.technicalProficiencies,
                          categories: newCategories,
                        },
                      },
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Add Skill Category
                </button>
              </div>

              {content.skills.technicalProficiencies.categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8 bg-white shadow rounded-lg p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => {
                          const newCategories = [...content.skills.technicalProficiencies.categories];
                          newCategories[categoryIndex] = { ...category, name: e.target.value };
                          setContent({
                            ...content,
                            skills: {
                              ...content.skills,
                              technicalProficiencies: {
                                ...content.skills.technicalProficiencies,
                                categories: newCategories,
                              },
                            },
                          });
                        }}
                        className="text-lg font-medium text-gray-900 border-0 focus:ring-0 p-0 bg-transparent"
                        placeholder="Category Name"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={category.icon}
                          onChange={(e) => {
                            const newCategories = [...content.skills.technicalProficiencies.categories];
                            newCategories[categoryIndex] = { ...category, icon: e.target.value };
                            setContent({
                              ...content,
                              skills: {
                                ...content.skills,
                                technicalProficiencies: {
                                  ...content.skills.technicalProficiencies,
                                  categories: newCategories,
                                },
                              },
                            });
                          }}
                          className="w-32 text-sm rounded-md border-gray-300"
                          placeholder="Icon class"
                        />
                        <i className={`${category.icon} text-purple-600 text-xl`}></i>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newCategories = content.skills.technicalProficiencies.categories.filter(
                          (_, i) => i !== categoryIndex
                        );
                        setContent({
                          ...content,
                          skills: {
                            ...content.skills,
                            technicalProficiencies: {
                              ...content.skills.technicalProficiencies,
                              categories: newCategories,
                            },
                          },
                        });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center gap-4 bg-gray-50 p-3 rounded-md">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const newCategories = [...content.skills.technicalProficiencies.categories];
                              const newSkills = [...category.skills];
                              newSkills[skillIndex] = { ...skill, name: e.target.value };
                              newCategories[categoryIndex] = { ...category, skills: newSkills };
                              setContent({
                                ...content,
                                skills: {
                                  ...content.skills,
                                  technicalProficiencies: {
                                    ...content.skills.technicalProficiencies,
                                    categories: newCategories,
                                  },
                                },
                              });
                            }}
                            className="w-full border-0 bg-transparent focus:ring-0"
                            placeholder="Skill name"
                          />
                        </div>
                        <div className="flex items-center gap-3 w-64">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={skill.percentage}
                            onChange={(e) => {
                              const newCategories = [...content.skills.technicalProficiencies.categories];
                              const newSkills = [...category.skills];
                              newSkills[skillIndex] = { ...skill, percentage: parseInt(e.target.value) };
                              newCategories[categoryIndex] = { ...category, skills: newSkills };
                              setContent({
                                ...content,
                                skills: {
                                  ...content.skills,
                                  technicalProficiencies: {
                                    ...content.skills.technicalProficiencies,
                                    categories: newCategories,
                                  },
                                },
                              });
                            }}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">{skill.percentage}%</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newCategories = [...content.skills.technicalProficiencies.categories];
                              const newSkills = category.skills.filter((_, i) => i !== skillIndex);
                              newCategories[categoryIndex] = { ...category, skills: newSkills };
                              setContent({
                                ...content,
                                skills: {
                                  ...content.skills,
                                  technicalProficiencies: {
                                    ...content.skills.technicalProficiencies,
                                    categories: newCategories,
                                  },
                                },
                              });
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newCategories = [...content.skills.technicalProficiencies.categories];
                        const newSkills = [...category.skills];
                        newSkills.push({ name: '', percentage: 50 });
                        newCategories[categoryIndex] = { ...category, skills: newSkills };
                        setContent({
                          ...content,
                          skills: {
                            ...content.skills,
                            technicalProficiencies: {
                              ...content.skills.technicalProficiencies,
                              categories: newCategories,
                            },
                          },
                        });
                      }}
                      className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Add Skill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="contact-title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="contact-title"
                value={content.contact.title}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, title: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="contact-subtitle" className="block text-sm font-medium text-gray-700">
                Subtitle
              </label>
              <input
                type="text"
                id="contact-subtitle"
                value={content.contact.subtitle}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, subtitle: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="e.g., Let's Build Something Together"
              />
            </div>
            <div>
              <label htmlFor="contact-description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="contact-description"
                value={content.contact.description}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, description: e.target.value }
                })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter your contact description"
              />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Contact Items</h3>
                <button
                  type="button"
                  onClick={() => {
                    const newItems = [...content.contact.contactItems];
                    newItems.push({
                      icon: 'fas fa-info',
                      label: 'New Item',
                      value: ''
                    });
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        contactItems: newItems
                      }
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Add Contact Item
                </button>
              </div>

              <div className="space-y-4">
                {content.contact.contactItems.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Icon Class</label>
                        <div className="mt-1 flex items-center space-x-2">
                          <input
                            type="text"
                            value={item.icon}
                            onChange={(e) => {
                              const newItems = [...content.contact.contactItems];
                              newItems[index] = { ...item, icon: e.target.value };
                              setContent({
                                ...content,
                                contact: {
                                  ...content.contact,
                                  contactItems: newItems
                                }
                              });
                            }}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          />
                          <i className={`${item.icon} text-xl text-purple-600`}></i>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Label</label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const newItems = [...content.contact.contactItems];
                            newItems[index] = { ...item, label: e.target.value };
                            setContent({
                              ...content,
                              contact: {
                                ...content.contact,
                                contactItems: newItems
                              }
                            });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Value</label>
                        <div className="mt-1 flex items-center space-x-2">
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => {
                              const newItems = [...content.contact.contactItems];
                              newItems[index] = { ...item, value: e.target.value };
                              setContent({
                                ...content,
                                contact: {
                                  ...content.contact,
                                  contactItems: newItems
                                }
                              });
                            }}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = content.contact.contactItems.filter((_, i) => i !== index);
                              setContent({
                                ...content,
                                contact: {
                                  ...content.contact,
                                  contactItems: newItems
                                }
                              });
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
                <button
                  type="button"
                  onClick={() => {
                    const newLinks = [...content.contact.socialLinks];
                    newLinks.push({
                      name: 'New Social',
                      icon: 'fab fa-link',
                      url: '',
                      color: 'bg-gray-600'
                    });
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        socialLinks: newLinks
                      }
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Add Social Link
                </button>
              </div>

              <div className="space-y-4">
                {content.contact.socialLinks.map((link, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => {
                            const newLinks = [...content.contact.socialLinks];
                            newLinks[index] = { ...link, name: e.target.value };
                            setContent({
                              ...content,
                              contact: {
                                ...content.contact,
                                socialLinks: newLinks
                              }
                            });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Icon Class</label>
                        <div className="mt-1 flex items-center space-x-2">
                          <input
                            type="text"
                            value={link.icon}
                            onChange={(e) => {
                              const newLinks = [...content.contact.socialLinks];
                              newLinks[index] = { ...link, icon: e.target.value };
                              setContent({
                                ...content,
                                contact: {
                                  ...content.contact,
                                  socialLinks: newLinks
                                }
                              });
                            }}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          />
                          <i className={`${link.icon} text-xl text-purple-600`}></i>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">URL</label>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...content.contact.socialLinks];
                            newLinks[index] = { ...link, url: e.target.value };
                            setContent({
                              ...content,
                              contact: {
                                ...content.contact,
                                socialLinks: newLinks
                              }
                            });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Color Class</label>
                        <div className="mt-1 flex items-center space-x-2">
                          <input
                            type="text"
                            value={link.color}
                            onChange={(e) => {
                              const newLinks = [...content.contact.socialLinks];
                              newLinks[index] = { ...link, color: e.target.value };
                              setContent({
                                ...content,
                                contact: {
                                  ...content.contact,
                                  socialLinks: newLinks
                                }
                              });
                            }}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          />
                          <div className={`w-6 h-6 rounded-full ${link.color}`}></div>
                          <button
                            type="button"
                            onClick={() => {
                              const newLinks = content.contact.socialLinks.filter((_, i) => i !== index);
                              setContent({
                                ...content,
                                contact: {
                                  ...content.contact,
                                  socialLinks: newLinks
                                }
                              });
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'footer' && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Header Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={content.footer.title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...content.footer, title: e.target.value },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  value={content.footer.subtitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...content.footer, subtitle: e.target.value },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                  <input
                    type="url"
                    value={content.footer.social.linkedin}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        footer: {
                          ...content.footer,
                          social: { ...content.footer.social, linkedin: e.target.value },
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
                  <input
                    type="url"
                    value={content.footer.social.github}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        footer: {
                          ...content.footer,
                          social: { ...content.footer.social, github: e.target.value },
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
                  <input
                    type="url"
                    value={content.footer.social.instagram}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        footer: {
                          ...content.footer,
                          social: { ...content.footer.social, instagram: e.target.value },
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
                  <input
                    type="url"
                    value={content.footer.social.twitter}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        footer: {
                          ...content.footer,
                          social: { ...content.footer.social, twitter: e.target.value },
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Bottom Links</h3>
                <button
                  type="button"
                  onClick={() => {
                    const newLinks = [...content.footer.bottomLinks];
                    newLinks.push({ label: '', url: '' });
                    setContent({
                      ...content,
                      footer: {
                        ...content.footer,
                        bottomLinks: newLinks,
                      },
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Add Link
                </button>
              </div>
              {content.footer.bottomLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-md">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Label</label>
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => {
                          const newLinks = [...content.footer.bottomLinks];
                          newLinks[index] = { ...link, label: e.target.value };
                          setContent({
                            ...content,
                            footer: {
                              ...content.footer,
                              bottomLinks: newLinks,
                            },
                          });
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">URL</label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...content.footer.bottomLinks];
                          newLinks[index] = { ...link, url: e.target.value };
                          setContent({
                            ...content,
                            footer: {
                              ...content.footer,
                              bottomLinks: newLinks,
                            },
                          });
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newLinks = content.footer.bottomLinks.filter((_, i) => i !== index);
                      setContent({
                        ...content,
                        footer: {
                          ...content.footer,
                          bottomLinks: newLinks,
                        },
                      });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Copyright Text</h3>
              <input
                type="text"
                value={content.footer.copyright}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, copyright: e.target.value },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 