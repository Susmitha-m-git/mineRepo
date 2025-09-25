import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  Search, 
  Shield, 
  AlertTriangle, 
  Truck, 
  BarChart3,
  Eye,
  Activity,
  Zap,
  Settings,
  Users,
  Clock
} from 'lucide-react';
import NavigationSystem from './components/NavigationSystem';
import MineralDetection from './components/MineralDetection';
import StructuralMonitoring from './components/StructuralMonitoring';
import SafetyHazards from './components/SafetyHazards';
import FleetCoordination from './components/FleetCoordination';
import OptimizationDashboard from './components/OptimizationDashboard';
import SimulationModule from "./components/SimulationModule";

type ActiveModule = 'navigation' | 'mineral' | 'structural' | 'safety' | 'fleet' | 'optimization' | 'simulation';

function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('navigation');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const modules = [
    { id: 'navigation', name: 'Navigation & SLAM', icon: Navigation, color: 'text-blue-400' },
    { id: 'mineral', name: 'Mineral Detection', icon: Search, color: 'text-green-400' },
    { id: 'structural', name: 'Structural Integrity', icon: Shield, color: 'text-purple-400' },
    { id: 'safety', name: 'Safety Hazards', icon: AlertTriangle, color: 'text-red-400' },
    { id: 'fleet', name: 'Fleet Coordination', icon: Truck, color: 'text-yellow-400' },
    { id: 'optimization', name: 'Process Optimization', icon: BarChart3, color: 'text-cyan-400' },
    { id: 'simulation', name: 'Simulation Module', icon: Activity, color: 'text-pink-400' },
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'navigation': return <NavigationSystem />;
      case 'mineral': return <MineralDetection />;
      case 'structural': return <StructuralMonitoring />;
      case 'safety': return <SafetyHazards />;
      case 'fleet': return <FleetCoordination />;
      case 'optimization': return <OptimizationDashboard />;
      case 'simulation': return <SimulationModule />; // ← Simulation Module added
      default: return <NavigationSystem />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-8 h-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">MineVision AI</h1>
            </div>
            <div className="text-sm text-gray-400">
              Intelligent Computer Vision Mining Operations
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-green-400">System Active</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">12 Operators</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-80 bg-gray-800 border-r border-gray-700 p-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white mb-4">Control Modules</h2>
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id as ActiveModule)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeModule === module.id 
                      ? 'bg-gray-700 border border-gray-600' 
                      : 'hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${module.color}`} />
                  <span className="text-gray-100 font-medium">{module.name}</span>
                </button>
              );
            })}
          </div>

          {/* System Status */}
          <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">AI Processing</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Camera Feeds</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">24/24</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Fleet Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-yellow-400">8/10</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Safety Level</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Optimal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Emergency Stop</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">System Settings</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
}

export default App;