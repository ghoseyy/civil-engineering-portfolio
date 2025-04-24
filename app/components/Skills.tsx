'use client';

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="hero-text text-3xl md:text-4xl font-bold text-gray-800 mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Skill 1 */}
          <div className="skill-bubble w-32 h-32 mx-auto" data-tilt>
            <div className="text-center p-4">
              <div className="text-purple-600 text-4xl mb-2">
                <i className="fas fa-drafting-compass"></i>
              </div>
              <h3 className="font-bold text-gray-800">Structural Design</h3>
            </div>
          </div>
          
          {/* Skill 2 */}
          <div className="skill-bubble w-32 h-32 mx-auto" data-tilt>
            <div className="text-center p-4">
              <div className="text-purple-600 text-4xl mb-2">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="font-bold text-gray-800">Sustainable Design</h3>
            </div>
          </div>
          
          {/* Skill 3 */}
          <div className="skill-bubble w-32 h-32 mx-auto" data-tilt>
            <div className="text-center p-4">
              <div className="text-purple-600 text-4xl mb-2">
                <i className="fas fa-cube"></i>
              </div>
              <h3 className="font-bold text-gray-800">3D Modeling</h3>
            </div>
          </div>
          
          {/* Skill 4 */}
          <div className="skill-bubble w-32 h-32 mx-auto" data-tilt>
            <div className="text-center p-4">
              <div className="text-purple-600 text-4xl mb-2">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="font-bold text-gray-800">Structural Analysis</h3>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Technical Proficiencies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <i className="fas fa-cog text-purple-600 mr-2"></i> Design Software
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">AutoCAD</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Revit</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">SketchUp</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <i className="fas fa-calculator text-purple-600 mr-2"></i> Analysis Tools
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ETABS</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">SAP2000</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">STAAD.Pro</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 