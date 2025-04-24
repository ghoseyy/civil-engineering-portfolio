'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="gradient-bg min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="hero-text text-4xl md:text-6xl font-bold text-gray-800 mb-6">Building Dreams, <span className="text-purple-600">Fyi with eyes closed 24/7</span></h1>
            <p className="text-lg text-gray-600 mb-8">Hi, I'm Sandhya Thapa, a passionate civil engineering student dedicated to creating sustainable and innovative infrastructure solutions.</p>
            <div className="flex space-x-4">
              <a href="#projects" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg">View My Work</a>
              <a href="#contact" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-full font-medium transition-colors">Contact Me</a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
              <div className="relative card-3d floating">
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Sandhya Thapa"
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