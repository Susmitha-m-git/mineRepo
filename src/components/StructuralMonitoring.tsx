import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingDown, Activity, Camera, Gauge } from 'lucide-react';

interface StructuralReading {
  id: string;
  location: string;
  type: 'stress' | 'displacement' | 'vibration';
  value: number;
  threshold: number;
  status: 'safe' | 'warning' | 'critical';
  lastUpdated: Date;
}

interface CrackDetection {
  id: string;
  location: string;
  length: number;
  width: number;
  depth: number;
  severity: 'minor' | 'moderate' | 'severe';
  growthRate: number;
}

const StructuralMonitoring: React.FC = () => {
  const [readings, setReadings] = useState<StructuralReading[]>([
    { id: 'S001', location: 'Tunnel A - Support 12', type: 'stress', value: 85, threshold: 100, status: 'warning', lastUpdated: new Date() },
    { id: 'S002', location: 'Main Shaft - Level 2', type: 'displacement', value: 2.3, threshold: 5.0, status: 'safe', lastUpdated: new Date() },
    { id: 'S003', location: 'Tunnel B - Junction', type: 'vibration', value: 45, threshold: 40, status: 'critical', lastUpdated: new Date() },
    { id: 'S004', location: 'East Wing - Support 8', type: 'stress', value: 72, threshold: 100, status: 'safe', lastUpdated: new Date() },
  ]);

  const [cracks, setCracks] = useState<CrackDetection[]>([
    { id: 'C001', location: 'Tunnel A - Wall Section 5', length: 1.2, width: 0.3, depth: 0.8, severity: 'moderate', growthRate: 0.02 },
    { id: 'C002', location: 'Main Shaft - Ceiling', length: 0.8, width: 0.1, depth: 0.4, severity: 'minor', growthRate: 0.01 },
    { id: 'C003', location: 'Tunnel C - Floor', length: 2.1, width: 0.5, depth: 1.2, severity: 'severe', growthRate: 0.05 },
  ]);

  const [structuralIntegrity, setStructuralIntegrity] = useState(87);
  const [totalSensors, setTotalSensors] = useState(24);
  const [activeSensors, setActiveSensors] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setReadings(prev => prev.map(reading => ({
        ...reading,
        value: Math.max(0, reading.value + (Math.random() - 0.5) * 5),
        lastUpdated: new Date(),
      })));
      
      setStructuralIntegrity(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-400 bg-green-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor': return 'text-green-400 bg-green-400/20';
      case 'moderate': return 'text-yellow-400 bg-yellow-400/20';
      case 'severe': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'stress': return <Gauge className="w-4 h-4" />;
      case 'displacement': return <TrendingDown className="w-4 h-4" />;
      case 'vibration': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Structural Integrity Monitoring</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">{activeSensors}/{totalSensors} Sensors Active</span>
          </div>
          <div className={`px-3 py-1 rounded-lg ${
            structuralIntegrity >= 90 ? 'bg-green-600' :
            structuralIntegrity >= 80 ? 'bg-yellow-600' : 'bg-red-600'
          }`}>
            <span className="text-white font-medium">Integrity: {structuralIntegrity.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-full">
        {/* Visual Monitoring */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Computer Vision Analysis</h3>
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400">8 Cameras</span>
              </div>
            </div>
          </div>
          <div className="p-4 h-80 relative bg-gray-900 overflow-hidden">
            {/* Simulated structural analysis view */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
              {/* Wall structure */}
              <div className="absolute inset-4 border-2 border-gray-600 rounded-lg">
                {/* Support beams */}
                <div className="absolute top-0 left-1/4 w-1 h-full bg-gray-500"></div>
                <div className="absolute top-0 left-2/4 w-1 h-full bg-gray-500"></div>
                <div className="absolute top-0 left-3/4 w-1 h-full bg-gray-500"></div>
                
                {/* Horizontal supports */}
                <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-500"></div>
                <div className="absolute top-2/4 left-0 w-full h-1 bg-gray-500"></div>
                <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-500"></div>

                {/* Crack overlays */}
                <div className="absolute top-1/3 left-1/3 w-16 h-0.5 bg-red-400 transform rotate-12"></div>
                <div className="absolute top-2/3 left-1/2 w-24 h-0.5 bg-yellow-400 transform -rotate-6"></div>
                <div className="absolute top-1/2 left-1/4 w-12 h-0.5 bg-orange-400 transform rotate-45"></div>

                {/* Stress indicators */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full ${
                      i < 2 ? 'bg-red-400' : i < 4 ? 'bg-yellow-400' : 'bg-green-400'
                    } animate-pulse`}
                    style={{
                      left: `${20 + (i % 3) * 30}%`,
                      top: `${20 + Math.floor(i / 3) * 50}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-2 left-2 space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-300">Critical Stress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Warning Level</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Normal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sensor Readings */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-4">Live Sensor Data</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {readings.map((reading) => (
                <div key={reading.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(reading.type)}
                      <span className="text-sm text-white font-medium">{reading.id}</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${getStatusColor(reading.status)}`}>
                      {reading.status}
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">{reading.location}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white">
                      {reading.value.toFixed(1)} / {reading.threshold}
                    </span>
                    <span className="text-xs text-gray-400">
                      {reading.type === 'stress' ? 'kPa' : reading.type === 'displacement' ? 'mm' : 'Hz'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-600 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          reading.status === 'critical' ? 'bg-red-400' :
                          reading.status === 'warning' ? 'bg-yellow-400' : 'bg-green-400'
                        }`}
                        style={{ width: `${Math.min(100, (reading.value / reading.threshold) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">System Health</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Overall Integrity</span>
                <span className={`font-mono ${
                  structuralIntegrity >= 90 ? 'text-green-400' :
                  structuralIntegrity >= 80 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {structuralIntegrity.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    structuralIntegrity >= 90 ? 'bg-green-400' :
                    structuralIntegrity >= 80 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${structuralIntegrity}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Safe Zones:</span>
                  <span className="text-green-400">18/24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Warnings:</span>
                  <span className="text-yellow-400">4/24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Critical:</span>
                  <span className="text-red-400">2/24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Offline:</span>
                  <span className="text-gray-400">0/24</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crack Analysis */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h3 className="font-semibold text-white">Crack Detection</h3>
            </div>
            <div className="space-y-3">
              {cracks.map((crack) => (
                <div key={crack.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">{crack.id}</span>
                    <div className={`px-2 py-1 rounded text-xs ${getSeverityColor(crack.severity)}`}>
                      {crack.severity}
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">{crack.location}</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Length:</span>
                      <span className="text-white">{crack.length}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Width:</span>
                      <span className="text-white">{crack.width}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Depth:</span>
                      <span className="text-white">{crack.depth}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Growth:</span>
                      <span className="text-orange-400">{crack.growthRate}mm/day</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive Analysis */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Predictive Analysis</h3>
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-yellow-400 font-medium mb-1">Maintenance Required</div>
                <div className="text-xs text-gray-300">Tunnel A - Support 12</div>
                <div className="text-xs text-gray-400">Estimated: 5 days</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-orange-400 font-medium mb-1">Inspection Needed</div>
                <div className="text-xs text-gray-300">Main Shaft - Level 2</div>
                <div className="text-xs text-gray-400">Estimated: 2 days</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-red-400 font-medium mb-1">Critical Repair</div>
                <div className="text-xs text-gray-300">Tunnel B - Junction</div>
                <div className="text-xs text-gray-400">Immediate attention</div>
              </div>
            </div>
          </div>

          {/* Environmental Factors */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Environmental Factors</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Ground Water Level</span>
                <span className="text-blue-400">Normal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Seismic Activity</span>
                <span className="text-green-400">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Temperature</span>
                <span className="text-white">18°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Humidity</span>
                <span className="text-white">65%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructuralMonitoring;