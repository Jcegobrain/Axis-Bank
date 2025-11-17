CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  descricao TEXT,
  banco VARCHAR(150),
  taxa NUMERIC(10,4),
  criado_em TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS simulacoes (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  produto_id INT REFERENCES produtos(id),
  parametros JSONB,
  resultado JSONB,
  criado_em TIMESTAMP DEFAULT now()
);

-- seed exemplo
INSERT INTO produtos (nome, categoria, descricao, banco, taxa)
VALUES
('Cartão Black Plus', 'Cartão de Crédito', 'Cartão premium com alta anuidade', 'Banco Exemplo', 0.0499),
('Empréstimo Pessoal', 'Empréstimo', 'Empréstimo pessoal com parcelas fixas', 'Banco Exemplo', 0.0215)
ON CONFLICT DO NOTHING;
