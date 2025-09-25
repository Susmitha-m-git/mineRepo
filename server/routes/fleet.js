import { Router } from 'express';

const router = Router();

router.get('/vehicles', (_req, res) => {
  res.json([
    { id: 'EX-001', type: 'excavator', status: 'active', location: 'Tunnel A-1', batteryLevel: 78, task: 'Rock Excavation', operator: 'AI-Auto', efficiency: 94, position: { x: 120, y: 80 } },
    { id: 'LD-002', type: 'loader', status: 'active', location: 'Loading Bay 2', batteryLevel: 92, task: 'Material Loading', operator: 'AI-Auto', efficiency: 89, position: { x: 200, y: 150 } },
    { id: 'TR-003', type: 'truck', status: 'idle', location: 'Storage Area', batteryLevel: 45, task: 'Waiting Assignment', operator: 'AI-Auto', efficiency: 0, position: { x: 80, y: 200 } },
    { id: 'DR-004', type: 'drill', status: 'maintenance', location: 'Maintenance Bay', batteryLevel: 15, task: 'Scheduled Maintenance', operator: 'Technician', efficiency: 0, position: { x: 300, y: 100 } },
    { id: 'EX-005', type: 'excavator', status: 'charging', location: 'Charging Station 1', batteryLevel: 67, task: 'Charging', operator: 'AI-Auto', efficiency: 0, position: { x: 250, y: 250 } },
    { id: 'TR-006', type: 'truck', status: 'active', location: 'Tunnel B-3', batteryLevel: 88, task: 'Material Transport', operator: 'AI-Auto', efficiency: 91, position: { x: 180, y: 120 } },
  ]);
});

router.get('/tasks', (_req, res) => {
  res.json([
    { id: 'T-001', type: 'excavation', priority: 'high', assignedVehicle: 'EX-001', location: 'Tunnel A-1', progress: 65, estimatedTime: 45, status: 'in_progress' },
    { id: 'T-002', type: 'loading', priority: 'medium', assignedVehicle: 'LD-002', location: 'Loading Bay 2', progress: 30, estimatedTime: 25, status: 'in_progress' },
    { id: 'T-003', type: 'transport', priority: 'urgent', location: 'Tunnel C-2', progress: 0, estimatedTime: 60, status: 'pending' },
    { id: 'T-004', type: 'drilling', priority: 'low', location: 'Survey Point 7', progress: 0, estimatedTime: 90, status: 'on_hold' },
    { id: 'T-005', type: 'inspection', priority: 'medium', location: 'Safety Zone 3', progress: 0, estimatedTime: 30, status: 'pending' },
  ]);
});

router.get('/stats', (_req, res) => {
  res.json({ fleetEfficiency: 87, totalTasks: 156, completedToday: 23 });
});

export default router;


