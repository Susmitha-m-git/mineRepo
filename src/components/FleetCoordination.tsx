import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Battery, Wrench, Clock, Zap, Activity, Target } from 'lucide-react';

interface Vehicle {
  id: string;
  type: 'excavator' | 'loader' | 'truck' | 'drill';
  status: 'active' | 'idle' | 'maintenance' | 'charging';
  location: string;
  batteryLevel: number;
  task: string;
  operator: string;
  efficiency: number;
  position: { x: number; y: number };
}

interface Task {
  id: string;
  type: 'excavation' | 'loading' | 'transport' | 'drilling' | 'inspection';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedVehicle?: string;
  location: string;
  progress: number;
  estimatedTime: number;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
}

const FleetCoordination: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 'EX-001', type: 'excavator', status: 'active', location: 'Tunnel A-1', batteryLevel: 78, task: 'Rock Excavation', operator: 'AI-Auto', efficiency: 94, position: { x: 120, y: 80 } },
    { id: 'LD-002', type: 'loader', status: 'active', location: 'Loading Bay 2', batteryLevel: 92, task: 'Material Loading', operator: 'AI-Auto', efficiency: 89, position: { x: 200, y: 150 } },
    { id: 'TR-003', type: 'truck', status: 'idle', location: 'Storage Area', batteryLevel: 45, task: 'Waiting Assignment', operator: 'AI-Auto', efficiency: 0, position: { x: 80, y: 200 } },
    { id: 'DR-004', type: 'drill', status: 'maintenance', location: 'Maintenance Bay', batteryLevel: 15, task: 'Scheduled Maintenance', operator: 'Technician', efficiency: 0, position: { x: 300, y: 100 } },
    { id: 'EX-005', type: 'excavator', status: 'charging', location: 'Charging Station 1', batteryLevel: 67, task: 'Charging', operator: 'AI-Auto', efficiency: 0, position: { x: 250, y: 250 } },
    { id: 'TR-006', type: 'truck', status: 'active', location: 'Tunnel B-3', batteryLevel: 88, task: 'Material Transport', operator: 'AI-Auto', efficiency: 91, position: { x: 180, y: 120 } },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 'T-001', type: 'excavation', priority: 'high', assignedVehicle: 'EX-001', location: 'Tunnel A-1', progress: 65, estimatedTime: 45, status: 'in_progress' },
    { id: 'T-002', type: 'loading', priority: 'medium', assignedVehicle: 'LD-002', location: 'Loading Bay 2', progress: 30, estimatedTime: 25, status: 'in_progress' },
    { id: 'T-003', type: 'transport', priority: 'urgent', location: 'Tunnel C-2', progress: 0, estimatedTime: 60, status: 'pending' },
    { id: 'T-004', type: 'drilling', priority: 'low', location: 'Survey Point 7', progress: 0, estimatedTime: 90, status: 'on_hold' },
    { id: 'T-005', type: 'inspection', priority: 'medium', location: 'Safety Zone 3', progress: 0, estimatedTime: 30, status: 'pending' },
  ]);

  const [fleetEfficiency, setFleetEfficiency] = useState(87);
  const [totalTasks, setTotalTasks] = useState(156);
  const [completedToday, setCompletedToday] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update vehicle positions and stats
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        batteryLevel: vehicle.status === 'charging' 
          ? Math.min(100, vehicle.batteryLevel + 0.5)
          : Math.max(0, vehicle.batteryLevel - (vehicle.status === 'active' ? 0.2 : 0.05)),
        efficiency: vehicle.status === 'active' 
          ? Math.max(80, Math.min(100, vehicle.efficiency + (Math.random() - 0.5) * 3))
          : 0,
        position: {
          x: vehicle.position.x + (Math.random() - 0.5) * 2,
          y: vehicle.position.y + (Math.random() - 0.5) * 2,
        }
      })));

      // Update task progress
      setTasks(prev => prev.map(task => ({
        ...task,
        progress: task.status === 'in_progress' 
          ? Math.min(100, task.progress + Math.random() * 2)
          : task.progress
      })));

      setFleetEfficiency(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'idle': return 'text-yellow-400 bg-yellow-400/20';
      case 'maintenance': return 'text-red-400 bg-red-400/20';
      case 'charging': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-500 bg-red-500/20';
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'excavator': return '🚜';
      case 'loader': return '🏗️';
      case 'truck': return '🚛';
      case 'drill': return '⚒️';
      default: return '🚧';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'excavation': return '⛏️';
      case 'loading': return '📦';
      case 'transport': return '🚚';
      case 'drilling': return '🔩';
      case 'inspection': return '🔍';
      default: return '📋';
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Truck className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Fleet Coordination & Task Management</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">{vehicles.filter(v => v.status === 'active').length}/{vehicles.length} Active</span>
          </div>
          <div className={`px-3 py-1 rounded-lg ${
            fleetEfficiency >= 90 ? 'bg-green-600' :
            fleetEfficiency >= 80 ? 'bg-yellow-600' : 'bg-red-600'
          }`}>
            <span className="text-white font-medium">Fleet Efficiency: {fleetEfficiency.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 h-full">
        {/* Fleet Map */}
        <div className="col-span-2 bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Live Fleet Positioning</h3>
          </div>
          <div className="p-6 h-96 relative bg-gray-900 rounded-b-lg overflow-hidden">
            {/* Mine layout background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Tunnel grid */}
              <div className="absolute inset-4 opacity-30">
                {/* Main tunnels */}
                <div className="absolute top-1/4 left-0 w-full h-2 bg-gray-600 rounded"></div>
                <div className="absolute top-2/4 left-0 w-full h-2 bg-gray-600 rounded"></div>
                <div className="absolute top-3/4 left-0 w-full h-2 bg-gray-600 rounded"></div>
                
                {/* Cross tunnels */}
                <div className="absolute top-0 left-1/4 w-2 h-full bg-gray-600 rounded"></div>
                <div className="absolute top-0 left-2/4 w-2 h-full bg-gray-600 rounded"></div>
                <div className="absolute top-0 left-3/4 w-2 h-full bg-gray-600 rounded"></div>

                {/* Special areas */}
                <div className="absolute top-4 right-4 w-16 h-12 border border-blue-400 rounded text-xs text-blue-400 text-center pt-2">
                  Charging
                </div>
                <div className="absolute bottom-4 left-4 w-16 h-12 border border-red-400 rounded text-xs text-red-400 text-center pt-2">
                  Maintenance
                </div>
              </div>

              {/* Vehicle positions */}
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`absolute w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    vehicle.status === 'active' ? 'border-green-400 bg-green-400/30' :
                    vehicle.status === 'idle' ? 'border-yellow-400 bg-yellow-400/30' :
                    vehicle.status === 'charging' ? 'border-blue-400 bg-blue-400/30' :
                    'border-red-400 bg-red-400/30'
                  }`}
                  style={{ 
                    left: `${Math.max(0, Math.min(90, vehicle.position.x))}px`, 
                    top: `${Math.max(0, Math.min(85, vehicle.position.y))}px` 
                  }}
                  title={`${vehicle.id} - ${vehicle.task}`}
                >
                  <span className="text-xs">{getVehicleIcon(vehicle.type)}</span>
                  {vehicle.status === 'active' && (
                    <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping"></div>
                  )}
                </div>
              ))}

              {/* Task locations */}
              {tasks.filter(t => t.status === 'pending').map((task, i) => (
                <div
                  key={task.id}
                  className="absolute w-4 h-4 border border-orange-400 bg-orange-400/20 rounded animate-pulse"
                  style={{ 
                    left: `${100 + i * 50}px`, 
                    top: `${60 + i * 40}px` 
                  }}
                  title={`${task.type} - ${task.location}`}
                >
                  <span className="text-xs text-orange-400">{getTaskIcon(task.type)}</span>
                </div>
              ))}
            </div>

            {/* Map legend */}
            <div className="absolute bottom-2 left-2 space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Active Vehicles</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Idle Vehicles</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full border border-orange-400"></div>
                <span className="text-gray-300">Pending Tasks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Fleet Status */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Fleet Status</h3>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getVehicleIcon(vehicle.type)}</span>
                      <span className="text-sm text-white font-medium">{vehicle.id}</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 mb-1">{vehicle.location}</div>
                  <div className="text-xs text-gray-200 mb-2">{vehicle.task}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Battery className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-white">{vehicle.batteryLevel.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-white">{vehicle.efficiency.toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-600 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full ${
                          vehicle.batteryLevel > 50 ? 'bg-green-400' :
                          vehicle.batteryLevel > 20 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${vehicle.batteryLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fleet Statistics */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Fleet Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Total Efficiency</span>
                <span className="text-green-400 font-mono">{fleetEfficiency.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Tasks Completed</span>
                <span className="text-blue-400 font-mono">{completedToday}/{totalTasks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Avg Battery</span>
                <span className="text-yellow-400 font-mono">
                  {(vehicles.reduce((sum, v) => sum + v.batteryLevel, 0) / vehicles.length).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Maintenance Due</span>
                <span className="text-red-400 font-mono">
                  {vehicles.filter(v => v.status === 'maintenance').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Management */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">Active Tasks</h3>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {tasks.map((task) => (
                <div key={task.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{getTaskIcon(task.type)}</span>
                      <span className="text-sm text-white font-medium">{task.id}</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 mb-1">{task.location}</div>
                  <div className="text-xs text-gray-200 mb-2 capitalize">{task.type} Task</div>
                  {task.assignedVehicle && (
                    <div className="text-xs text-blue-400 mb-2">Assigned: {task.assignedVehicle}</div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs text-white">{task.progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-400 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{task.estimatedTime}min</span>
                    </div>
                    <span className={`text-xs px-1 py-0.5 rounded ${
                      task.status === 'completed' ? 'text-green-400 bg-green-400/20' :
                      task.status === 'in_progress' ? 'text-blue-400 bg-blue-400/20' :
                      task.status === 'on_hold' ? 'text-red-400 bg-red-400/20' :
                      'text-yellow-400 bg-yellow-400/20'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coordination Controls */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Coordination Controls</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                🎯 Auto-Assign Tasks
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                ⚡ Optimize Routes
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                📊 Generate Report
              </button>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                🔧 Schedule Maintenance
              </button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Performance</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Task Completion Rate</span>
                  <span className="text-white">89%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">On-Time Delivery</span>
                  <span className="text-white">94%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Equipment Uptime</span>
                  <span className="text-white">96%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetCoordination;