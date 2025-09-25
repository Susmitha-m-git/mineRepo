import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Eye, Zap, Users, Clock } from 'lucide-react';

interface Hazard {
  id: string;
  type: 'falling_rocks' | 'gas_leak' | 'equipment_collision' | 'fire' | 'structural' | 'personnel';
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: Date;
  status: 'active' | 'resolved' | 'investigating';
  confidence: number;
}

interface PersonnelAlert {
  id: string;
  workerId: string;
  workerName: string;
  location: string;
  alertType: 'ppe_violation' | 'unauthorized_area' | 'emergency' | 'medical';
  timestamp: Date;
}

const SafetyHazards: React.FC = () => {
  const [hazards, setHazards] = useState<Hazard[]>([
    {
      id: 'H001',
      type: 'falling_rocks',
      location: 'Tunnel A - Section 12',
      severity: 'high',
      description: 'Loose rock formation detected above main pathway',
      detectedAt: new Date(Date.now() - 300000),
      status: 'active',
      confidence: 94
    },
    {
      id: 'H002',
      type: 'gas_leak',
      location: 'Ventilation Shaft B',
      severity: 'medium',
      description: 'Methane levels elevated beyond safe threshold',
      detectedAt: new Date(Date.now() - 600000),
      status: 'investigating',
      confidence: 87
    },
    {
      id: 'H003',
      type: 'equipment_collision',
      location: 'Main Tunnel - Junction 3',
      severity: 'critical',
      description: 'Two excavators in potential collision path',
      detectedAt: new Date(Date.now() - 120000),
      status: 'active',
      confidence: 98
    }
  ]);

  const [personnelAlerts, setPersonnelAlerts] = useState<PersonnelAlert[]>([
    {
      id: 'PA001',
      workerId: 'W-4521',
      workerName: 'John Smith',
      location: 'Tunnel B - Level 2',
      alertType: 'ppe_violation',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: 'PA002',
      workerId: 'W-7832',
      workerName: 'Sarah Johnson',
      location: 'Restricted Zone A',
      alertType: 'unauthorized_area',
      timestamp: new Date(Date.now() - 240000)
    }
  ]);

  const [safetyScore, setSafetyScore] = useState(78);
  const [activePersonnel, setActivePersonnel] = useState(45);


  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time hazard updates
      const newSeverity = Math.random();
      if (newSeverity > 0.95) {
        const newHazard: Hazard = {
          id: `H${String(Date.now()).slice(-3)}`,
          type: ['falling_rocks', 'gas_leak', 'equipment_collision', 'fire', 'structural'][Math.floor(Math.random() * 5)] as any,
          location: `Tunnel ${String.fromCharCode(65 + Math.floor(Math.random() * 3))} - Section ${Math.floor(Math.random() * 20 + 1)}`,
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          description: 'Automatically detected hazard requiring immediate attention',
          detectedAt: new Date(),
          status: 'active',
          confidence: Math.floor(Math.random() * 20 + 80)
        };
        setHazards(prev => [newHazard, ...prev.slice(0, 9)]);
      }

      setSafetyScore(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 3)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'high': return 'text-orange-400 bg-orange-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-400/20';
      case 'investigating': return 'text-yellow-400 bg-yellow-400/20';
      case 'resolved': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getHazardIcon = (type: string) => {
    switch (type) {
      case 'falling_rocks': return '🪨';
      case 'gas_leak': return '💨';
      case 'equipment_collision': return '⚠️';
      case 'fire': return '🔥';
      case 'structural': return '🏗️';
      case 'personnel': return '👷';
      default: return '⚠️';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'ppe_violation': return 'text-yellow-400 bg-yellow-400/20';
      case 'unauthorized_area': return 'text-red-400 bg-red-400/20';
      case 'emergency': return 'text-red-500 bg-red-500/20';
      case 'medical': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <h2 className="text-2xl font-bold text-white">Real-Time Safety Hazard Detection</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">{activePersonnel} Personnel Active</span>
          </div>
          <div className={`px-3 py-1 rounded-lg ${
            safetyScore >= 90 ? 'bg-green-600' :
            safetyScore >= 75 ? 'bg-yellow-600' : 'bg-red-600'
          }`}>
            <span className="text-white font-medium">Safety Score: {safetyScore.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 h-full">
        {/* Live Detection Feed */}
        <div className="col-span-2 bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Live Hazard Detection</h3>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">AI Monitoring</span>
              </div>
            </div>
          </div>
          <div className="p-6 h-96 relative bg-black rounded-b-lg overflow-hidden">
            {/* Simulated mine environment */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
              {/* Environment elements */}
              <div className="absolute inset-4 border border-gray-600 rounded-lg opacity-30">
                {/* Tunnel structure */}
                <div className="absolute top-0 left-1/4 w-1 h-full bg-gray-500"></div>
                <div className="absolute top-0 right-1/4 w-1 h-full bg-gray-500"></div>
                <div className="absolute top-1/3 left-0 w-full h-1 bg-gray-500"></div>
              </div>

              {/* Hazard indicators */}
              <div className="absolute top-20 left-16 w-20 h-16 border-2 border-red-400 rounded-lg bg-red-400/20 animate-pulse">
                <div className="text-center text-red-400 text-xs mt-1">🪨</div>
                <div className="text-center text-red-400 text-xs">FALLING ROCKS</div>
              </div>

              <div className="absolute top-32 right-20 w-24 h-20 border-2 border-yellow-400 rounded-lg bg-yellow-400/20 animate-pulse">
                <div className="text-center text-yellow-400 text-xs mt-1">💨</div>
                <div className="text-center text-yellow-400 text-xs">GAS DETECTED</div>
              </div>

              <div className="absolute bottom-20 left-1/2 w-28 h-18 border-2 border-red-500 rounded-lg bg-red-500/20 animate-pulse">
                <div className="text-center text-red-500 text-xs mt-1">⚠️</div>
                <div className="text-center text-red-500 text-xs">COLLISION RISK</div>
              </div>

              {/* Equipment/Personnel indicators */}
              <div className="absolute bottom-12 left-8 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-12 right-12 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute top-16 left-1/2 w-3 h-3 bg-green-400 rounded-full"></div>

              {/* Scanning overlay */}
              <div className="absolute inset-0 border border-green-400/30 rounded-lg">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-green-400"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-green-400"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-green-400"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
              </div>
            </div>

            {/* Status overlay */}
            <div className="absolute top-4 left-4 bg-black/80 rounded-lg p-2">
              <div className="text-xs text-gray-300">
                <div>Camera: Tunnel-A-Cam-03</div>
                <div>Resolution: 1920x1080</div>
                <div>AI Processing: Active</div>
                <div className="text-green-400">Status: Monitoring</div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Hazards */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-red-400" />
              <h3 className="font-semibold text-white">Active Hazards</h3>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {hazards.filter(h => h.status === 'active').map((hazard) => (
                <div key={hazard.id} className="bg-gray-700 rounded-lg p-3 border-l-4 border-red-400">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getHazardIcon(hazard.type)}</span>
                      <span className="text-sm text-white font-medium">{hazard.id}</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${getSeverityColor(hazard.severity)}`}>
                      {hazard.severity}
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">{hazard.location}</div>
                  <div className="text-xs text-gray-200 mb-2">{hazard.description}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {Math.floor((Date.now() - hazard.detectedAt.getTime()) / 60000)}m ago
                    </span>
                    <span className="text-xs text-green-400">{hazard.confidence}% confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Controls */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Emergency Controls</h3>
            <div className="space-y-2">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                🚨 EMERGENCY EVACUATION
              </button>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                ⚠️ STOP ALL EQUIPMENT
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                📢 BROADCAST ALERT
              </button>
            </div>
          </div>

          {/* Safety Metrics */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Safety Metrics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Safety Score</span>
                  <span className="text-white">{safetyScore.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      safetyScore >= 90 ? 'bg-green-400' :
                      safetyScore >= 75 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${safetyScore}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Hazards:</span>
                  <span className="text-red-400">{hazards.filter(h => h.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Investigating:</span>
                  <span className="text-yellow-400">{hazards.filter(h => h.status === 'investigating').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Resolved Today:</span>
                  <span className="text-green-400">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Response Time:</span>
                  <span className="text-blue-400">2.3min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personnel Safety */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Personnel Safety</h3>
            </div>
            <div className="space-y-3">
              {personnelAlerts.map((alert) => (
                <div key={alert.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">{alert.workerName}</span>
                    <div className={`px-2 py-1 rounded text-xs ${getAlertTypeColor(alert.alertType)}`}>
                      {alert.alertType.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 mb-1">ID: {alert.workerId}</div>
                  <div className="text-xs text-blue-400 mb-2">{alert.location}</div>
                  <div className="text-xs text-gray-400">
                    {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Hazards History */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Recent Hazards</h3>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {hazards.map((hazard) => (
                <div key={hazard.id} className="bg-gray-700 rounded-lg p-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{getHazardIcon(hazard.type)}</span>
                      <span className="text-xs text-white">{hazard.id}</span>
                    </div>
                    <div className={`px-1 py-0.5 rounded text-xs ${getStatusColor(hazard.status)}`}>
                      {hazard.status}
                    </div>
                  </div>
                  <div className="text-xs text-gray-300">{hazard.location}</div>
                  <div className="text-xs text-gray-400">
                    {Math.floor((Date.now() - hazard.detectedAt.getTime()) / 60000)}m ago
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Protocol Status */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Safety Protocols</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Emergency System</span>
                <span className="text-green-400">Armed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Evacuation Routes</span>
                <span className="text-green-400">Clear</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Communication</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Medical Response</span>
                <span className="text-yellow-400">2 Teams Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyHazards;