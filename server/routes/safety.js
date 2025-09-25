import { Router } from 'express';

const router = Router();

router.get('/hazards', (_req, res) => {
  res.json([
    { id: 'H001', type: 'falling_rocks', location: 'Tunnel A - Section 12', severity: 'high', description: 'Loose rock formation detected above main pathway', detectedAt: new Date(Date.now() - 300000).toISOString(), status: 'active', confidence: 94 },
    { id: 'H002', type: 'gas_leak', location: 'Ventilation Shaft B', severity: 'medium', description: 'Methane levels elevated beyond safe threshold', detectedAt: new Date(Date.now() - 600000).toISOString(), status: 'investigating', confidence: 87 },
    { id: 'H003', type: 'equipment_collision', location: 'Main Tunnel - Junction 3', severity: 'critical', description: 'Two excavators in potential collision path', detectedAt: new Date(Date.now() - 120000).toISOString(), status: 'active', confidence: 98 },
  ]);
});

router.get('/personnel-alerts', (_req, res) => {
  res.json([
    { id: 'PA001', workerId: 'W-4521', workerName: 'John Smith', location: 'Tunnel B - Level 2', alertType: 'ppe_violation', timestamp: new Date(Date.now() - 180000).toISOString() },
    { id: 'PA002', workerId: 'W-7832', workerName: 'Sarah Johnson', location: 'Restricted Zone A', alertType: 'unauthorized_area', timestamp: new Date(Date.now() - 240000).toISOString() },
  ]);
});

router.get('/score', (_req, res) => {
  res.json({ safetyScore: 78, activePersonnel: 45 });
});

export default router;


