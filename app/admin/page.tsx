'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/projects" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </Link>
        
        <Link href="/admin/theme" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Theme</h2>
          <p className="text-gray-600">Customize colors, fonts, and icons</p>
        </Link>
        
        <Link href="/admin/content" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Content</h2>
          <p className="text-gray-600">Edit hero, about, and contact sections</p>
        </Link>
      </div>
    </div>
  );
} 