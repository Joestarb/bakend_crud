const express = require('express');
const cors = require('cors');
const dataRoutes = require('./dataRoutes');
const { PORT } = require('./config');

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
  }));
  
app.use(express.json());

// Configurar rutas
app.use('/', dataRoutes);

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a mi aplicación CRUD');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
