const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.PG_CONNECTION
});

// Fallback in-memory store used when DB is not available
let useFallback = false;
let fallbackItems = [
  { id: 1, title: 'Örnek madde 1', description: 'Bu bir demo öğedir.' },
  { id: 2, title: 'Örnek madde 2', description: 'İkinci demo öğe.' }
];
let nextFallbackId = 3;

// Test DB connection on startup; if it fails, switch to fallback
(async function testDbConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('DB connection OK');
  } catch (err) {
    console.warn('DB not available, switching to in-memory fallback.');
    useFallback = true;
  }
})();

// Serve frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// Basic API: items
app.get('/api/items', async (req, res) => {
  try {
    if (useFallback) {
      return res.json(fallbackItems.slice().sort((a,b)=>a.id-b.id));
    }
    const result = await pool.query('SELECT * FROM items ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.post('/api/items', async (req, res) => {
  const { title, description } = req.body;
  try {
    if (useFallback) {
      const item = { id: nextFallbackId++, title, description };
      fallbackItems.push(item);
      return res.status(201).json(item);
    }
    const result = await pool.query(
      'INSERT INTO items (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    if (useFallback) {
      const idx = fallbackItems.findIndex(i => String(i.id) === String(id));
      if (idx === -1) return res.status(404).json({ error: 'Not found' });
      fallbackItems.splice(idx, 1);
      return res.status(204).end();
    }
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
