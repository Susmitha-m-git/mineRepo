import { Router } from 'express';

const router = Router();

router.get('/stats', (_req, res) => {
  res.json({ processingRate: 127, totalValue: 15420, accuracy: 94.2 });
});

router.get('/detections', (_req, res) => {
  res.json([
    { id: 'D1', mineral: 'Gold', purity: 78, weight: 2.4, coordinates: { x: 120, y: 80 }, confidence: 96 },
    { id: 'D2', mineral: 'Copper', purity: 65, weight: 5.2, coordinates: { x: 200, y: 150 }, confidence: 88 },
    { id: 'D3', mineral: 'Iron', purity: 82, weight: 12.1, coordinates: { x: 80, y: 200 }, confidence: 91 },
  ]);
});

router.get('/samples', (_req, res) => {
  res.json([
    { id: '001', type: 'Gold Ore', confidence: 94, value: 1250, location: 'Tunnel A-1', timestamp: new Date().toISOString() },
    { id: '002', type: 'Copper', confidence: 87, value: 420, location: 'Tunnel B-2', timestamp: new Date().toISOString() },
    { id: '003', type: 'Iron Ore', confidence: 92, value: 180, location: 'Tunnel A-3', timestamp: new Date().toISOString() },
    { id: '004', type: 'Silver', confidence: 89, value: 850, location: 'Tunnel C-1', timestamp: new Date().toISOString() },
  ]);
});

export default router;


