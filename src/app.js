const express = require('express');
const cors = require('cors');
const pdfRoutes = require('./routes/pdf.routes');

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  methods: ['POST'],
}));
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.use('/api/pdf', pdfRoutes);

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE')
    return res.status(413).json({ message: 'File too large (max 20MB)' });
  if (err.message?.startsWith('Unsupported file type'))
    return res.status(415).json({ message: err.message });
  console.error('[Unhandled]', err);
  res.status(500).json({ message: 'Internal server error' });
});
module.exports = app;
