import React from 'react';

function MovieClapper3D() {
  return (
    <div className="w-full h-96 relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 rounded-2xl">
      {/* 3D CSS Clapperboard */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative transform-gpu perspective-1000">
          {/* Main clapperboard container */}
          <div className="relative transform-gpu hover:rotate-y-6 hover:rotate-x-3 transition-transform duration-700 ease-out">

            {/* Main board */}
            <div className="w-80 h-60 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl border-2 border-gray-700 transform-gpu">
              {/* Board stripes */}
              <div className="absolute top-4 left-4 right-4 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded transform-gpu"></div>
              <div className="absolute top-12 left-4 right-4 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded transform-gpu"></div>
              <div className="absolute bottom-12 left-4 right-4 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded transform-gpu"></div>
              <div className="absolute bottom-4 left-4 right-4 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded transform-gpu"></div>

              {/* Text on board */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-white text-2xl font-bold mb-2 tracking-wider transform-gpu">MOVIE MANIA</h3>
                <p className="text-orange-400 text-lg font-semibold transform-gpu">SCENE 1 TAKE 1</p>
              </div>

              {/* Clapper arm with animation */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 origin-bottom animate-pulse">
                <div className="w-1 h-16 bg-gradient-to-b from-amber-800 to-amber-900 rounded transform-gpu shadow-lg"></div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gradient-to-r from-amber-700 to-amber-800 rounded-lg shadow-lg animate-bounce"></div>
              </div>

              {/* Hinge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full shadow-lg"></div>
            </div>

            {/* Shadow effect */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-72 h-8 bg-black/30 rounded-full blur-md"></div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-8 left-8 w-2 h-2 bg-primary-400 rounded-full animate-ping"></div>
      <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-primary-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-12 left-12 w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-8 right-8 w-1 h-1 bg-primary-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>

      {/* Film strip pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='7' r='7'/%3E%3Ccircle cx='7' cy='53' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/30 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
    </div>
  );
}

export default MovieClapper3D;
