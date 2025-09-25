import { Router } from 'express';

const router = Router();

router.get('/readings', (_req, res) => {
  res.json([
    { id: 'S001', location: 'Tunnel A - Support 12', type: 'stress', value: 85, threshold: 100, status: 'warning', lastUpdated: new Date().toISOString() },
    { id: 'S002', location: 'Main Shaft - Level 2', type: 'displacement', value: 2.3, threshold: 5.0, status: 'safe', lastUpdated: new Date().toISOString() },
    { id: 'S003', location: 'Tunnel B - Junction', type: 'vibration', value: 45, threshold: 40, status: 'critical', lastUpdated: new Date().toISOString() },
    { id: 'S004', location: 'East Wing - Support 8', type: 'stress', value: 72, threshold: 100, status: 'safe', lastUpdated: new Date().toISOString() },
  ]);
});

router.get('/cracks', (_req, res) => {
  res.json([
    { id: 'C001', location: 'Tunnel A - Wall Section 5', length: 1.2, width: 0.3, depth: 0.8, severity: 'moderate', growthRate: 0.02 },
    { id: 'C002', location: 'Main Shaft - Ceiling', length: 0.8, width: 0.1, depth: 0.4, severity: 'minor', growthRate: 0.01 },
    { id: 'C003', location: 'Tunnel C - Floor', length: 2.1, width: 0.5, depth: 1.2, severity: 'severe', growthRate: 0.05 },
  ]);
});

export default router;


