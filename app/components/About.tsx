'use client';

import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="hero-text text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
            <div className="card-3d" data-tilt data-tilt-max="15" data-tilt-speed="400" data-tilt-perspective="1000">
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Sandhya Thapa"
                width={320}
                height={320}
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Sandhya Thapa</h3>
            <p className="text-purple-600 font-medium mb-6">Civil Engineering Student | Sustainable Design Enthusiast</p>
            <p className="text-gray-600 mb-4">I'm currently pursuing my Bachelor's degree in Civil Engineering at Pokhara University, with a passion for sustainable infrastructure and innovative design solutions.</p>
            <p className="text-gray-600 mb-6">My journey in civil engineering began when I was fascinated by the blend of creativity and technical precision required to shape our built environment. I believe in designing structures that not only stand the test of time but also harmonize with nature and serve communities effectively.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <i className="fas fa-graduation-cap text-purple-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Education</p>
                  <p className="text-sm text-gray-500">Pokhara University</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <i className="fas fa-map-marker-alt text-purple-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Location</p>
                  <p className="text-sm text-gray-500">Pokhara, kaski</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <i className="fas fa-heart text-purple-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Interests</p>
                  <p className="text-sm text-gray-500">Sustainable Design</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <i className="fas fa-briefcase text-purple-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Experience</p>
                  <p className="text-sm text-gray-500">0+ Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 