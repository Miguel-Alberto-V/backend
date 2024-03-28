// agendaRoutes.js
const express = require('express');
const pool = require('../db');

const router = express.Router();

// Obtener todos los eventos de la agenda
router.get('/listar', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM agenda');
    res.json(rows);
  } catch (err) {
    console.error('Error getting events:', err);
    res.status(500).json({ error: 'Error getting events' });
  }
});

router.get('/evento/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query('SELECT * FROM agenda WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error('Error getting event by ID:', err);
      res.status(500).json({ error: 'Error getting event by ID' });
    }
  });

router.post('/crear', async (req, res) => {
    const { evento, importancia } = req.body;
    try {
      const { rows } = await pool.query(
        'INSERT INTO agenda (evento, importancia) VALUES ($1, $2) RETURNING *',
        [evento, importancia]
      );
      // Envía solo la respuesta con el estado de éxito y la redirección
      res.status(201).send({ status: "Success", message: " exitoso", redirect: "/" });
    } catch (err) {
      console.error('Error creating event:', err);
      res.status(500).json({ error: 'Error creating event' });
    }
  });

// Actualizar un evento existente en la agenda
router.put('/actualizar/:id', async (req, res) => {
  const { id } = req.params;
  const { evento, importancia } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE agenda SET evento = $1, importancia = $2 WHERE id = $3 RETURNING *',
      [evento, importancia, id]
    );
    res.status(201).send({ status: "Success", message: " exitoso", redirect: "/" });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ error: 'Error updating event' });
  }
});

// Eliminar un evento de la agenda
router.delete('/eliminar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM agenda WHERE id = $1', [id]);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ error: 'Error deleting event' });
  }
});

module.exports = router;
