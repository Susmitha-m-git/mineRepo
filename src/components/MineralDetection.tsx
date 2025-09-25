import React, { useState, useEffect, useMemo } from 'react';
import { Search, Eye, Zap, TrendingUp, Camera, Cpu } from 'lucide-react';

interface MineralSample {
  id: string;
  type: string;
  confidence: number;
  value: number;
  location: string;
  timestamp: Date;
}

interface Detection {
  id: string;
  mineral: string;
  purity: number;
  weight: number;
  coordinates: { x: number; y: number };
  confidence: number;
}

// Memoized component for rock texture to prevent re-rendering
const RockTexture = React.memo(() => {
  const rocks = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      width: Math.random() * 20 + 5,
      height: Math.random() * 20 + 5,
      left: Math.random() * 100,
      top: Math.random() * 100,
    })), []
  );

  return (
    <div className="absolute inset-0 opacity-30">
      {rocks.map((rock) => (
        <div
          key={rock.id}
          className="absolute rounded-full bg-gray-600"
          style={{
            width: `${rock.width}px`,
            height: `${rock.height}px`,
            left: `${rock.left}%`,
            top: `${rock.top}%`,
          }}
        />
      ))}
    </div>
  );
});

const MineralDetection: React.FC = () => {
  const [samples, setSamples] = useState<MineralSample[]>([
    { id: '001', type: 'Gold Ore', confidence: 94, value: 1250, location: 'Tunnel A-1', timestamp: new Date() },
    { id: '002', type: 'Copper', confidence: 87, value: 420, location: 'Tunnel B-2', timestamp: new Date() },
    { id: '003', type: 'Iron Ore', confidence: 92, value: 180, location: 'Tunnel A-3', timestamp: new Date() },
    { id: '004', type: 'Silver', confidence: 89, value: 850, location: 'Tunnel C-1', timestamp: new Date() },
  ]);

  const [activeDetections, setActiveDetections] = useState<Detection[]>([
    { id: 'D1', mineral: 'Gold', purity: 78, weight: 2.4, coordinates: { x: 120, y: 80 }, confidence: 96 },
    { id: 'D2', mineral: 'Copper', purity: 65, weight: 5.2, coordinates: { x: 200, y: 150 }, confidence: 88 },
    { id: 'D3', mineral: 'Iron', purity: 82, weight: 12.1, coordinates: { x: 80, y: 200 }, confidence: 91 },
  ]);

  const [processingRate, setProcessingRate] = useState(127);
  const [totalValue, setTotalValue] = useState(15420);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingRate(prev => Math.max(80, Math.min(200, prev + (Math.random() - 0.5) * 10)));
      setTotalValue(prev => prev + Math.random() * 50);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getMineralColor = (type: string) => {
    const colors: Record<string, string> = {
      'Gold': 'text-yellow-400 bg-yellow-400/20',
      'Gold Ore': 'text-yellow-400 bg-yellow-400/20',
      'Copper': 'text-orange-400 bg-orange-400/20',
      'Iron': 'text-gray-400 bg-gray-400/20',
      'Iron Ore': 'text-gray-400 bg-gray-400/20',
      'Silver': 'text-blue-200 bg-blue-200/20',
    };
    return colors[type] || 'text-gray-400 bg-gray-400/20';
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Search className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white">AI Mineral Detection & Analysis</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">AI Model: MineralNet-v3.2</span>
          </div>
          <div className="px-3 py-1 bg-green-600 rounded-lg">
            <span className="text-white font-medium">{processingRate.toFixed(0)} samples/min</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 h-full">
        {/* Live Detection Feed */}
        <div className="col-span-2 bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Live Camera Feed - Spectral Analysis</h3>
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Active</span>
              </div>
            </div>
          </div>
          <div className="p-6 h-96 relative bg-black rounded-b-lg overflow-hidden">
            {/* Simulated camera feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              {/* Rock surface texture simulation */}
              <RockTexture />

              {/* Detection overlays */}
              {activeDetections.map((detection) => (
                <div
                  key={detection.id}
                  className="absolute border-2 border-green-400 rounded-lg p-2 bg-black/80"
                  style={{
                    left: `${detection.coordinates.x}px`,
                    top: `${detection.coordinates.y}px`,
                    width: '120px',
                    height: '80px',
                  }}
                >
                  <div className="text-xs text-green-400 font-semibold">{detection.mineral}</div>
                  <div className="text-xs text-white">Purity: {detection.purity}%</div>
                  <div className="text-xs text-white">{detection.weight}kg</div>
                  <div className="text-xs text-gray-300">{detection.confidence}% conf</div>
                </div>
              ))}

              {/* Scanning line effect */}
              <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse top-1/2" />
            </div>

            {/* Info overlay */}
            <div className="absolute top-4 left-4 bg-black/80 rounded-lg p-3">
              <div className="text-xs text-gray-300 space-y-1">
                <div>Resolution: 2048x1536</div>
                <div>Spectral Range: 400-2500nm</div>
                <div>Frame Rate: 30 FPS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detection Results */}
        <div className="space-y-6">
          {/* Real-time Stats */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Eye className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Detection Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Processing Rate</span>
                <span className="text-blue-400 font-mono">{processingRate.toFixed(0)}/min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Accuracy</span>
                <span className="text-green-400 font-mono">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Total Value</span>
                <span className="text-yellow-400 font-mono">${totalValue.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Active Detections */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-white">Active Detections</h3>
            </div>
            <div className="space-y-2">
              {activeDetections.map((detection) => (
                <div key={detection.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium px-2 py-1 rounded ${getMineralColor(detection.mineral)}`}>
                      {detection.mineral}
                    </span>
                    <span className="text-xs text-gray-400">{detection.confidence}%</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1">
                    <div>Purity: {detection.purity}%</div>
                    <div>Weight: {detection.weight}kg</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Performance */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">AI Performance</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Precision</span>
                  <span className="text-white">96.4%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '96.4%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Recall</span>
                  <span className="text-white">92.1%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '92.1%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">F1 Score</span>
                  <span className="text-white">94.2%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mineral Analysis */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-4">Recent Samples</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {samples.map((sample) => (
                <div key={sample.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium px-2 py-1 rounded ${getMineralColor(sample.type)}`}>
                      {sample.type}
                    </span>
                    <span className="text-xs text-gray-400">#{sample.id}</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span className="text-white">{sample.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Value:</span>
                      <span className="text-green-400">${sample.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="text-blue-400">{sample.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spectral Analysis */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Spectral Signature</h3>
            <div className="h-32 bg-gray-900 rounded-lg p-2 relative overflow-hidden">
              <div className="absolute inset-2">
                {/* Simulated spectral graph */}
                <div className="w-full h-full relative">
                  <svg className="w-full h-full">
                    <path
                      d="M0,60 Q20,40 40,45 T80,35 T120,50 T160,30 T200,40 T240,25 T280,35 T320,45"
                      stroke="#10B981"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M0,70 Q20,50 40,55 T80,65 T120,60 T160,70 T200,50 T240,65 T280,55 T320,60"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-1 left-2 text-xs text-gray-400">400nm</div>
              <div className="absolute bottom-1 right-2 text-xs text-gray-400">2500nm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MineralDetection;