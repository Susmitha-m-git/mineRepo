import { Router } from 'express';

const router = Router();

router.get('/metrics', (_req, res) => {
  res.json({
    extractionRate: 87.3,
    energyEfficiency: 92.1,
    wasteReduction: 78.5,
    profitability: 156780
  });
});

router.get('/compliance', (_req, res) => {
  res.json([
    { category: 'Environmental Impact', status: 'compliant', score: 94, lastCheck: Date.now() - 86400000, nextDue: Date.now() + 604800000 },
    { category: 'Worker Safety', status: 'compliant', score: 98, lastCheck: Date.now() - 43200000, nextDue: Date.now() + 259200000 },
    { category: 'Emissions Control', status: 'warning', score: 76, lastCheck: Date.now() - 172800000, nextDue: Date.now() + 432000000 },
    { category: 'Water Management', status: 'compliant', score: 91, lastCheck: Date.now() - 259200000, nextDue: Date.now() + 345600000 },
    { category: 'Noise Levels', status: 'compliant', score: 88, lastCheck: Date.now() - 345600000, nextDue: Date.now() + 518400000 },
  ]);
});

router.get('/optimizations', (_req, res) => {
  res.json([
    { id: 1, title: 'Route Optimization', impact: '+12% efficiency', savings: '$8,400/month', status: 'implementing' },
    { id: 2, title: 'Energy Management', impact: '-15% energy use', savings: '$12,600/month', status: 'analyzing' },
    { id: 3, title: 'Predictive Maintenance', impact: '+8% uptime', savings: '$6,200/month', status: 'active' },
    { id: 4, title: 'Waste Stream Optimization', impact: '-22% waste', savings: '$4,800/month', status: 'proposed' },
  ]);
});

export default router;


