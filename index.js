// server.js
const express = require('express');
const cors = require('cors'); // Importar cors
const agendaRoutes = require('./src/routes/agendaRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN, // Tomar el origen desde una variable de entorno
    methods: ["GET", "POST", "PUT", "DELETE"], // Completar los métodos que deseas permitir
  };
  
app.use(cors(corsOptions));

app.use('/', agendaRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
