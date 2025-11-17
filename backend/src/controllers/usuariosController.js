const pool = require('../db/pool');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const { rows: exists } = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (exists.length) return res.status(400).json({ erro: 'Email já cadastrado' });

    const senha_hash = await bcrypt.hash(senha, 10);
    const { rows } = await pool.query(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1,$2,$3) RETURNING id, nome, email',
      [nome, email, senha_hash]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const { rows } = await pool.query('SELECT id, nome, email, senha_hash FROM usuarios WHERE email = $1', [email]);
    if (!rows.length) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const user = rows[0];
    const ok = await bcrypt.compare(senha, user.senha_hash);
    if (!ok) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'troquesecreta', { expiresIn: '8h' });
    res.json({ token, user: { id: user.id, nome: user.nome, email: user.email }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno' });
  }
};
