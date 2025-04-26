'use client';

import { useState, useEffect } from 'react';
import { useRefresh } from '../context/RefreshContext';

interface Skill {
  name: string;
  percentage: number;
}

interface TechnicalCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

interface SkillCategory {
  name: string;
  icon: string;
  color: string;
}

interface SkillContent {
  title: string;
  skillCategories: SkillCategory[];
  technicalProficiencies: {
    title: string;
    categories: TechnicalCategory[];
  };
}

export default function Skills() {
  const [content, setContent] = useState<SkillContent | null>(null);
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
        setContent(data.skills);
      } catch (err) {
        console.error('Error fetching skills content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [refreshKey]);

  if (isLoading || !content) {
    return (
      <section id="skills" className="py-20 bg-[var(--color-light-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-[var(--color-light-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
          <div className="w-20 h-1 bg-theme-primary mx-auto"></div>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {content.skillCategories.map((category, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto bg-[var(--color-background)] rounded-full shadow-lg flex items-center justify-center transform transition-transform hover:scale-105 group">
                <div className="text-center p-4">
                  <i className={`${category.icon} text-theme-primary text-3xl mb-2 group-hover:scale-110 transition-transform`}></i>
                  <h3 className="text-sm font-semibold mt-2">{category.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Proficiencies */}
        <div className="bg-[var(--color-background)] rounded-xl p-8 mt-12">
          <h3 className="text-2xl font-bold mb-8 pl-4">
            {content.technicalProficiencies.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {content.technicalProficiencies.categories.map((category, index) => (
              <div key={index} className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <i className={category.icon + " text-theme-primary text-2xl"}></i>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--color-text)] font-medium">{skill.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[var(--color-text)] opacity-75">{skill.percentage}%</span>
                          <div className="w-48 h-2 bg-[var(--color-light-bg)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-theme-primary rounded-full transition-all duration-300"
                              style={{
                                width: `${skill.percentage}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 