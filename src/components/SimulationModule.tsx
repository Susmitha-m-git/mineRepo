import React, { useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  Activity,
  Database,
  Eye,
  Monitor,
  Server,
} from 'lucide-react';

interface MockDataset {
  id: string;
  name: string;
  type: 'image' | 'pointcloud' | 'sensor_log';
  size: number;
  timestamp: string;
  status: 'ready' | 'processing' | 'completed' | 'error';
}

interface PipelineStage {
  name: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  icon: React.ReactNode;
  duration?: number;
  progress: number;
}

interface SimulationResult {
  stage: string;
  success: boolean;
  metrics: Record<string, number>;
  timestamp: string;
}

const SimulationModule: React.FC = () => {
  const [datasets, setDatasets] = useState<MockDataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    { name: 'Data Replay', status: 'idle', icon: <Database className="w-5 h-5" />, progress: 0 },
    { name: 'Perception', status: 'idle', icon: <Eye className="w-5 h-5" />, progress: 0 },
    { name: 'Backend Processing', status: 'idle', icon: <Server className="w-5 h-5" />, progress: 0 },
    { name: 'Frontend Display', status: 'idle', icon: <Monitor className="w-5 h-5" />, progress: 0 },
  ]);

  // Mock datasets
  useEffect(() => {
    const mockDatasets: MockDataset[] = [
      { id: '1', name: 'Highway Scenario A', type: 'image', size: 2.4, timestamp: '2025-01-20 09:30:00', status: 'ready' },
      { id: '2', name: 'Urban Traffic Dataset', type: 'pointcloud', size: 5.7, timestamp: '2025-01-20 10:15:00', status: 'ready' },
      { id: '3', name: 'Weather Conditions Mix', type: 'sensor_log', size: 1.8, timestamp: '2025-01-20 11:00:00', status: 'ready' },
      { id: '4', name: 'Night Driving Sequence', type: 'image', size: 3.2, timestamp: '2025-01-20 11:45:00', status: 'ready' },
    ];
    setDatasets(mockDatasets);
  }, []);

  const resetSimulation = useCallback(() => {
    setCurrentStage(0);
    setResults([]);
    setPipelineStages(stages =>
      stages.map(stage => ({ ...stage, status: 'idle', progress: 0, duration: undefined }))
    );
  }, []);

  const runPipelineStage = async (stageIndex: number): Promise<void> => {
    return new Promise(resolve => {
      const stageName = pipelineStages[stageIndex].name;
      const startTime = Date.now();

      setPipelineStages(stages =>
        stages.map((stage, index) => (index === stageIndex ? { ...stage, status: 'running' } : stage))
      );

      const progressInterval = setInterval(() => {
        setPipelineStages(stages =>
          stages.map((stage, index) =>
            index === stageIndex && stage.progress < 100
              ? { ...stage, progress: Math.min(stage.progress + Math.random() * 15, 100) }
              : stage
          )
        );
      }, 200);

      setTimeout(() => {
        clearInterval(progressInterval);
        const duration = Date.now() - startTime;
        const success = Math.random() > 0.1;

        setPipelineStages(stages =>
          stages.map((stage, index) =>
            index === stageIndex
              ? { ...stage, status: success ? 'completed' : 'error', progress: 100, duration }
              : stage
          )
        );

        setResults(prev => [
          ...prev,
          {
            stage: stageName,
            success,
            metrics: {
              'Processing Time (ms)': duration,
              'Data Points Processed': Math.floor(Math.random() * 10000) + 1000,
              'Accuracy Score': success ? Math.random() * 0.3 + 0.7 : Math.random() * 0.3 + 0.3,
              'Confidence Level': success ? Math.random() * 0.2 + 0.8 : Math.random() * 0.4 + 0.4,
            },
            timestamp: new Date().toISOString(),
          },
        ]);

        resolve();
      }, Math.random() * 3000 + 1500);
    });
  };

  const startSimulation = async () => {
    if (!selectedDataset) {
      alert('Please select a dataset first');
      return;
    }
    setIsSimulating(true);
    resetSimulation();

    for (let i = 0; i < pipelineStages.length; i++) {
      setCurrentStage(i);
      await runPipelineStage(i);
      if (pipelineStages[i].status === 'error') break;
      await new Promise(r => setTimeout(r, 500));
    }
    setIsSimulating(false);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    resetSimulation();
  };

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `simulation_results_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getDatasetTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'bg-blue-700 text-white';
      case 'pointcloud':
        return 'bg-purple-700 text-white';
      case 'sensor_log':
        return 'bg-green-700 text-white';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-yellow-400';
      case 'completed':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="h-full overflow-auto p-6 bg-gray-900 text-gray-100">
      {/* Module Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-8 h-8 text-pink-400" />
        <h1 className="text-2xl font-bold">Simulation Module</h1>
      </div>

      {/* Dataset Selection */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {datasets.map(dataset => (
          <div
            key={dataset.id}
            className={`p-4 rounded-lg cursor-pointer border-2 ${
              selectedDataset === dataset.id
                ? 'border-pink-400 bg-gray-800'
                : 'border-gray-700 hover:border-pink-500 hover:bg-gray-800/50'
            }`}
            onClick={() => setSelectedDataset(dataset.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{dataset.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDatasetTypeColor(dataset.type)}`}>
                {dataset.type}
              </span>
            </div>
            <p className="text-sm text-gray-300 mb-1">{dataset.size} GB</p>
            <p className="text-xs text-gray-500">{dataset.timestamp}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={startSimulation}
          disabled={isSimulating || !selectedDataset}
          className="flex items-center space-x-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-5 h-5" />
          <span>Start</span>
        </button>
        <button
          onClick={stopSimulation}
          disabled={!isSimulating}
          className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Square className="w-5 h-5" />
          <span>Stop</span>
        </button>
        <button
          onClick={resetSimulation}
          disabled={isSimulating}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>
        <button
          onClick={exportResults}
          disabled={results.length === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      {/* Pipeline */}
      <div className="space-y-4 mb-6">
        {pipelineStages.map((stage, index) => (
          <div key={stage.name} className="border rounded-lg p-4 bg-gray-800">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    currentStage === index && isSimulating
                      ? 'bg-yellow-600'
                      : stage.status === 'completed'
                      ? 'bg-green-600'
                      : stage.status === 'error'
                      ? 'bg-red-600'
                      : 'bg-gray-700'
                  }`}
                >
                  {stage.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{stage.name}</h3>
                  <p className={`text-sm ${getStatusColor(stage.status)}`}>
                    {stage.status}
                    {stage.duration && <span className="ml-2 text-gray-400">({(stage.duration / 1000).toFixed(1)}s)</span>}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {stage.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-400" />}
                {stage.status === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                {stage.status === 'running' && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400"></div>}
              </div>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  stage.status === 'completed'
                    ? 'bg-green-400'
                    : stage.status === 'error'
                    ? 'bg-red-400'
                    : stage.status === 'running'
                    ? 'bg-yellow-400'
                    : 'bg-gray-600'
                }`}
                style={{ width: `${stage.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((result, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{result.stage}</h3>
                <div className="flex items-center space-x-2">
                  {result.success ? <CheckCircle className="w-5 h-5 text-green-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                  <span className={`text-sm font-medium ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                    {result.success ? 'Success' : 'Failed'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(result.metrics).map(([key, value]) => (
                  <div key={key} className="p-2 bg-gray-700 rounded text-center">
                    <p className="text-xs text-gray-400">{key}</p>
                    <p className="font-semibold text-white">
                      {typeof value === 'number' && key.includes('Score')
                        ? (value * 100).toFixed(1) + '%'
                        : typeof value === 'number' && key.includes('Level')
                        ? (value * 100).toFixed(1) + '%'
                        : value.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimulationModule;