import { Router } from 'express';

const router = Router();

router.get('/status', (_req, res) => {
  res.json({ slamActive: true, activeVehicles: 5, mappingProgress: 67.2 });
});

router.get('/tunnels', (_req, res) => {
  res.json([
    { id: 'T-001', name: 'Main Shaft A', status: 'active', confidence: 98 },
    { id: 'T-002', name: 'North Tunnel B', status: 'mapped', confidence: 95 },
    { id: 'T-003', name: 'South Extraction', status: 'active', confidence: 92 },
    { id: 'T-004', name: 'Emergency Route', status: 'blocked', confidence: 87 },
    { id: 'T-005', name: 'East Ventilation', status: 'mapped', confidence: 94 },
  ]);
});

export default router;


