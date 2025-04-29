'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRefresh } from '../context/RefreshContext';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface ProjectsContent {
  tagStyles: {
    backgroundColor: string;
    backgroundOpacity: number;
    textColor: string;
  };
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [content, setContent] = useState<ProjectsContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, contentResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/content')
        ]);

        if (!projectsResponse.ok || !contentResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const projectsData = await projectsResponse.json();
        const contentData = await contentResponse.json();

        setProjects(projectsData.projects || []);
        setContent(contentData.projects || {
          tagStyles: {
            backgroundColor: 'var(--color-primary)',
            backgroundOpacity: 10,
            textColor: 'var(--color-primary)'
          }
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="hero-text text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-theme-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="project-card card-3d p-6" data-tilt data-tilt-max="10" data-tilt-speed="400">
              <div className="relative overflow-hidden rounded-lg h-48 mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-xl">{project.title}</h3>
                </div>
              </div>
              <p className="text-[var(--color-text)] mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    style={{
                      position: 'relative',
                      color: content?.tagStyles.textColor || 'var(--color-primary)',
                      isolation: 'isolate'
                    }}
                    className="text-xs px-3 py-1 rounded-full"
                  >
                    <span
                      style={{
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: content?.tagStyles.backgroundColor || 'var(--color-primary)',
                        opacity: (content?.tagStyles.backgroundOpacity || 10) / 100,
                        borderRadius: '9999px',
                        zIndex: -1,
                      }}
                    />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-theme-primary hover:opacity-80 font-medium">
            View All Projects
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
} 