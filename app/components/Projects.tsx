'use client';

import Image from 'next/image';

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="hero-text text-3xl md:text-4xl font-bold text-gray-800 mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="project-card card-3d p-6" data-tilt data-tilt-max="10" data-tilt-speed="400">
            <div className="relative overflow-hidden rounded-lg h-48 mb-4">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Sustainable Housing Project"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white font-bold text-xl">Sustainable Housing Complex</h3>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Designed a net-zero energy residential complex incorporating passive solar design and rainwater harvesting systems.</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Sustainable Design</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Structural Analysis</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">AutoCAD</span>
            </div>
          </div>
          
          {/* Project 2 */}
          <div className="project-card card-3d p-6" data-tilt data-tilt-max="10" data-tilt-speed="400">
            <div className="relative overflow-hidden rounded-lg h-48 mb-4">
              <Image
                src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Pedestrian Bridge"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white font-bold text-xl">Pedestrian Suspension Bridge</h3>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Developed a lightweight suspension bridge design connecting two university campuses over a river.</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Bridge Design</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Structural Analysis</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Revit</span>
            </div>
          </div>
          
          {/* Project 3 */}
          <div className="project-card card-3d p-6" data-tilt data-tilt-max="10" data-tilt-speed="400">
            <div className="relative overflow-hidden rounded-lg h-48 mb-4">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Urban Park"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white font-bold text-xl">Urban Green Space Design</h3>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Created a sustainable urban park design with permeable paving and native plant landscaping.</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Landscape Design</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">Sustainability</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">SketchUp</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
            View All Projects
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
} 