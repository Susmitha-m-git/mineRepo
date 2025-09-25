import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Leaf, DollarSign, Zap, Clock, Target, Award } from 'lucide-react';

interface MetricData {
  name: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

interface ComplianceItem {
  category: string;
  status: 'compliant' | 'warning' | 'violation';
  score: number;
  lastCheck: Date;
  nextDue: Date;
}

const OptimizationDashboard: React.FC = () => {
  const [extractionRate, setExtractionRate] = useState(87.3);
  const [energyEfficiency, setEnergyEfficiency] = useState(92.1);
  const [wasteReduction, setWasteReduction] = useState(78.5);
  const [profitability, setProfitability] = useState(156780);

  const metrics: MetricData[] = [
    { name: 'Extraction Rate', current: extractionRate, target: 90, trend: 'up', unit: '%' },
    { name: 'Energy Efficiency', current: energyEfficiency, target: 95, trend: 'stable', unit: '%' },
    { name: 'Waste Reduction', current: wasteReduction, target: 85, trend: 'up', unit: '%' },
    { name: 'Cost per Ton', current: 42.3, target: 38, trend: 'down', unit: '$' },
  ];

  const compliance: ComplianceItem[] = [
    { category: 'Environmental Impact', status: 'compliant', score: 94, lastCheck: new Date(Date.now() - 86400000), nextDue: new Date(Date.now() + 604800000) },
    { category: 'Worker Safety', status: 'compliant', score: 98, lastCheck: new Date(Date.now() - 43200000), nextDue: new Date(Date.now() + 259200000) },
    { category: 'Emissions Control', status: 'warning', score: 76, lastCheck: new Date(Date.now() - 172800000), nextDue: new Date(Date.now() + 432000000) },
    { category: 'Water Management', status: 'compliant', score: 91, lastCheck: new Date(Date.now() - 259200000), nextDue: new Date(Date.now() + 345600000) },
    { category: 'Noise Levels', status: 'compliant', score: 88, lastCheck: new Date(Date.now() - 345600000), nextDue: new Date(Date.now() + 518400000) },
  ];

  const [optimizations, setOptimizations] = useState([
    { id: 1, title: 'Route Optimization', impact: '+12% efficiency', savings: '$8,400/month', status: 'implementing' },
    { id: 2, title: 'Energy Management', impact: '-15% energy use', savings: '$12,600/month', status: 'analyzing' },
    { id: 3, title: 'Predictive Maintenance', impact: '+8% uptime', savings: '$6,200/month', status: 'active' },
    { id: 4, title: 'Waste Stream Optimization', impact: '-22% waste', savings: '$4,800/month', status: 'proposed' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setExtractionRate(prev => Math.max(80, Math.min(95, prev + (Math.random() - 0.5) * 1)));
      setEnergyEfficiency(prev => Math.max(88, Math.min(98, prev + (Math.random() - 0.5) * 0.8)));
      setWasteReduction(prev => Math.max(70, Math.min(90, prev + (Math.random() - 0.5) * 1.2)));
      setProfitability(prev => Math.max(140000, prev + (Math.random() - 0.5) * 5000));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400 bg-green-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'violation': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'implementing': return 'text-blue-400 bg-blue-400/20';
      case 'analyzing': return 'text-yellow-400 bg-yellow-400/20';
      case 'proposed': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Process Optimization & Compliance</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Award className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">Compliance Score: 92%</span>
          </div>
          <div className="px-3 py-1 bg-green-600 rounded-lg">
            <span className="text-white font-medium">Revenue: ${(profitability/1000).toFixed(0)}K/month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 h-full">
        {/* Key Performance Metrics */}
        <div className="col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Key Performance Metrics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <div key={metric.name} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">{metric.name}</span>
                    <TrendingUp className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {metric.current.toFixed(1)}{metric.unit}
                  </div>
                  <div className="text-xs text-gray-400 mb-3">
                    Target: {metric.target}{metric.unit}
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        metric.current >= metric.target ? 'bg-green-400' :
                        metric.current >= metric.target * 0.8 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.min(100, (metric.current / metric.target) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Optimization Chart */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Process Efficiency Trends</h3>
            </div>
            <div className="h-48 bg-gray-900 rounded-lg p-4 relative">
              {/* Simulated chart */}
              <div className="absolute inset-4">
                <div className="w-full h-full relative">
                  {/* Chart grid */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-20">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="border border-gray-600"></div>
                    ))}
                  </div>
                  
                  {/* Chart lines */}
                  <svg className="w-full h-full absolute inset-0">
                    <path
                      d="M0,120 L40,100 L80,85 L120,75 L160,70 L200,65 L240,60 L280,55"
                      stroke="#06D6A0"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M0,100 L40,95 L80,90 L120,88 L160,85 L200,82 L240,80 L280,78"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M0,140 L40,135 L80,125 L120,115 L160,105 L200,95 L240,85 L280,82"
                      stroke="#F59E0B"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute bottom-2 left-2 space-y-1">
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-3 h-0.5 bg-green-400"></div>
                      <span className="text-gray-300">Extraction Rate</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-3 h-0.5 bg-blue-400"></div>
                      <span className="text-gray-300">Energy Efficiency</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-3 h-0.5 bg-yellow-400"></div>
                      <span className="text-gray-300">Waste Reduction</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Axes labels */}
              <div className="absolute bottom-1 left-1/2 text-xs text-gray-400 transform -translate-x-1/2">
                Time (Hours)
              </div>
              <div className="absolute left-1 top-1/2 text-xs text-gray-400 transform -rotate-90 -translate-y-1/2">
                Performance (%)
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Opportunities */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-white">Optimization Opportunities</h3>
            </div>
            <div className="space-y-3">
              {optimizations.map((opt) => (
                <div key={opt.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">{opt.title}</span>
                    <div className={`px-2 py-1 rounded text-xs ${getStatusColor(opt.status)}`}>
                      {opt.status}
                    </div>
                  </div>
                  <div className="text-xs text-green-400 mb-1">{opt.impact}</div>
                  <div className="text-xs text-yellow-400">{opt.savings}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Impact */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-white">Financial Impact</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Monthly Revenue</span>
                <span className="text-green-400 font-mono">${(profitability/1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Cost Savings</span>
                <span className="text-blue-400 font-mono">$32K/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">ROI Improvement</span>
                <span className="text-purple-400 font-mono">+23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Efficiency Gain</span>
                <span className="text-yellow-400 font-mono">+15%</span>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Leaf className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-white">Environmental Impact</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Carbon Footprint</span>
                  <span className="text-white">-18%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Water Usage</span>
                  <span className="text-white">-12%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Waste Reduction</span>
                  <span className="text-white">{wasteReduction.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: `${wasteReduction}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Dashboard */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Compliance Status</h3>
            </div>
            <div className="space-y-3">
              {compliance.map((item) => (
                <div key={item.category} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">{item.category}</span>
                    <div className={`px-2 py-1 rounded text-xs ${getComplianceColor(item.status)}`}>
                      {item.status}
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-300">Score</span>
                    <span className="text-xs text-white">{item.score}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1.5 mb-2">
                    <div 
                      className={`h-1.5 rounded-full ${
                        item.score >= 90 ? 'bg-green-400' :
                        item.score >= 75 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Last Check: {Math.floor((Date.now() - item.lastCheck.getTime()) / 86400000)}d ago</span>
                    <span>Next Due: {Math.floor((item.nextDue.getTime() - Date.now()) / 86400000)}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Alerts */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Regulatory Alerts</h3>
            <div className="space-y-2">
              <div className="bg-yellow-600/20 border border-yellow-600 rounded-lg p-3">
                <div className="text-sm text-yellow-400 font-medium mb-1">Emissions Report Due</div>
                <div className="text-xs text-gray-300">Submit quarterly emissions report by next Friday</div>
              </div>
              <div className="bg-blue-600/20 border border-blue-600 rounded-lg p-3">
                <div className="text-sm text-blue-400 font-medium mb-1">Safety Inspection</div>
                <div className="text-xs text-gray-300">Scheduled inspection in 2 weeks - prepare documentation</div>
              </div>
              <div className="bg-green-600/20 border border-green-600 rounded-lg p-3">
                <div className="text-sm text-green-400 font-medium mb-1">Certification Renewed</div>
                <div className="text-xs text-gray-300">Environmental certification renewed for another year</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                📊 Generate Report
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                🎯 Run Optimization
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                📋 Compliance Check
              </button>
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                🔍 Audit Trail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationDashboard;