import express from 'express';
import cors from 'cors';

import navigationRouter from './routes/navigation.js';
import mineralRouter from './routes/mineral.js';
import structuralRouter from './routes/structural.js';
import safetyRouter from './routes/safety.js';
import fleetRouter from './routes/fleet.js';
import optimizationRouter from './routes/optimization.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'MineVision AI Backend' });
});

app.use('/api/navigation', navigationRouter);
app.use('/api/mineral', mineralRouter);
app.use('/api/structural', structuralRouter);
app.use('/api/safety', safetyRouter);
app.use('/api/fleet', fleetRouter);
app.use('/api/optimization', optimizationRouter);

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});


