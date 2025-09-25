import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Navigation, Compass, Route, Zap, Target } from 'lucide-react';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Tunnel {
  id: string;
  name: string;
  status: 'active' | 'mapped' | 'blocked';
  confidence: number;
}

// Static data moved outside component to prevent recreation
const TUNNELS: Tunnel[] = [
  { id: 'T-001', name: 'Main Shaft A', status: 'active', confidence: 98 },
  { id: 'T-002', name: 'North Tunnel B', status: 'mapped', confidence: 95 },
  { id: 'T-003', name: 'South Extraction', status: 'active', confidence: 92 },
  { id: 'T-004', name: 'Emergency Route', status: 'blocked', confidence: 87 },
  { id: 'T-005', name: 'East Ventilation', status: 'mapped', confidence: 94 },
];

const NavigationSystem: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 150, y: 200, z: -45 });
  const [mappingProgress, setMappingProgress] = useState(67);
  const [activeVehicles, setActiveVehicles] = useState(5);
  const [animationOffset, setAnimationOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition(prev => ({
        x: prev.x + (Math.random() - 0.5) * 2,
        y: prev.y + (Math.random() - 0.5) * 2,
        z: prev.z + (Math.random() - 0.5) * 0.5,
      }));
      setMappingProgress(prev => Math.min(100, prev + Math.random() * 0.1));
      setAnimationOffset(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'mapped': return 'text-blue-400 bg-blue-400/20';
      case 'blocked': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Navigation className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Underground Navigation & SLAM</h2>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-green-400">SLAM Active</span>
          </div>
          <div className="px-3 py-1 bg-blue-600 rounded-lg">
            <span className="text-white font-medium">{activeVehicles} Vehicles Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-full">
        {/* 3D Tunnel Visualization */}
        <div className="col-span-2 bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">3D Tunnel Mapping</h3>
          </div>
          <div className="p-6 h-96 relative bg-gray-900 rounded-b-lg overflow-hidden">
            {/* Simulated 3D tunnel view */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
              {/* Grid lines for depth effect */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute border-gray-600 border-t"
                    style={{
                      top: `${5 + i * 4.5}%`,
                      left: `${10 + i * 2}%`,
                      right: `${10 + i * 2}%`,
                    }}
                  />
                ))}
              </div>
              
              {/* Tunnel walls */}
              <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border-2 border-blue-400/30 rounded-lg">
                <div className="absolute inset-2 border border-blue-400/20 rounded-lg"></div>
              </div>

              {/* Vehicle position indicator */}
              <div 
                className="absolute w-3 h-3 bg-green-400 rounded-full animate-pulse"
                style={{ 
                  left: `${45 + Math.sin(animationOffset * 0.1) * 10}%`, 
                  top: `${45 + Math.cos(animationOffset * 0.1) * 5}%` 
                }}
              >
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
              </div>

              {/* Reference points */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    left: `${20 + (i % 4) * 20}%`,
                    top: `${30 + Math.floor(i / 4) * 40}%`,
                  }}
                />
              ))}
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Current Position</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Reference Points</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Tunnel Boundary</span>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Current Position */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-white">Current Position</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">X:</span>
                <span className="text-white font-mono">{currentPosition.x.toFixed(1)}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Y:</span>
                <span className="text-white font-mono">{currentPosition.y.toFixed(1)}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Depth:</span>
                <span className="text-white font-mono">{currentPosition.z.toFixed(1)}m</span>
              </div>
            </div>
          </div>

          {/* SLAM Progress */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Mapping Progress</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Overall</span>
                <span className="text-white">{mappingProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${mappingProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Navigation Status */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Compass className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">Navigation Status</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">GPS Signal</span>
                <span className="text-red-400">Unavailable</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Visual SLAM</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">LiDAR</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">IMU</span>
                <span className="text-green-400">Calibrated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tunnel Status */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Route className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-white">Tunnel Network Status</h3>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {TUNNELS.map((tunnel) => (
            <div key={tunnel.id} className="bg-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">{tunnel.id}</span>
                <div className={`px-2 py-1 rounded text-xs ${getStatusColor(tunnel.status)}`}>
                  {tunnel.status}
                </div>
              </div>
              <div className="text-sm font-medium text-white mb-1">{tunnel.name}</div>
              <div className="text-xs text-gray-300">Confidence: {tunnel.confidence}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationSystem;