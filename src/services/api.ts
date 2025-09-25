export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init && init.headers ? init.headers : {})
    },
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const api = {
  navigation: {
    getStatus: () => getJson<{ slamActive: boolean; activeVehicles: number; mappingProgress: number }>(`/api/navigation/status`),
    getTunnels: () => getJson<Array<{ id: string; name: string; status: string; confidence: number }>>(`/api/navigation/tunnels`),
  },
  mineral: {
    getStats: () => getJson<{ processingRate: number; totalValue: number; accuracy: number }>(`/api/mineral/stats`),
    getDetections: () => getJson<Array<{ id: string; mineral: string; purity: number; weight: number; coordinates: { x: number; y: number }; confidence: number }>>(`/api/mineral/detections`),
    getSamples: () => getJson<Array<{ id: string; type: string; confidence: number; value: number; location: string; timestamp: string }>>(`/api/mineral/samples`),
  },
  structural: {
    getReadings: () => getJson<Array<{ id: string; location: string; type: string; value: number; threshold: number; status: string; lastUpdated: string }>>(`/api/structural/readings`),
    getCracks: () => getJson<Array<{ id: string; location: string; length: number; width: number; depth: number; severity: string; growthRate: number }>>(`/api/structural/cracks`),
  },
  safety: {
    getHazards: () => getJson<Array<{ id: string; type: string; location: string; severity: string; description: string; detectedAt: string; status: string; confidence: number }>>(`/api/safety/hazards`),
    getPersonnelAlerts: () => getJson<Array<{ id: string; workerId: string; workerName: string; location: string; alertType: string; timestamp: string }>>(`/api/safety/personnel-alerts`),
    getScore: () => getJson<{ safetyScore: number; activePersonnel: number }>(`/api/safety/score`),
  },
  fleet: {
    getVehicles: () => getJson<Array<{ id: string; type: string; status: string; location: string; batteryLevel: number; task: string; operator: string; efficiency: number; position: { x: number; y: number } }>>(`/api/fleet/vehicles`),
    getTasks: () => getJson<Array<{ id: string; type: string; priority: string; assignedVehicle?: string; location: string; progress: number; estimatedTime: number; status: string }>>(`/api/fleet/tasks`),
    getStats: () => getJson<{ fleetEfficiency: number; totalTasks: number; completedToday: number }>(`/api/fleet/stats`),
  },
  optimization: {
    getMetrics: () => getJson<{ extractionRate: number; energyEfficiency: number; wasteReduction: number; profitability: number }>(`/api/optimization/metrics`),
    getCompliance: () => getJson<Array<{ category: string; status: string; score: number; lastCheck: number; nextDue: number }>>(`/api/optimization/compliance`),
    getOptimizations: () => getJson<Array<{ id: number; title: string; impact: string; savings: string; status: string }>>(`/api/optimization/optimizations`),
  },
};


