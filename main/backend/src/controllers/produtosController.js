const pool = require('../db/pool');

exports.listar = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, nome, categoria, descricao, banco, taxa FROM produtos ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno' });
  }
};

exports.obter = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
    if (!rows.length) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno' });
  }
};
