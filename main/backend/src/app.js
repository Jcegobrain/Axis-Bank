const express = require('express');
const cors = require('cors');
const produtosRoutes = require('./routes/produtos');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

module.exports = app;
