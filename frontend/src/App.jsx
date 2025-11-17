import { Outlet, Link } from 'react-router-dom'

export default function App(){
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <header>
        <h1>Hub Produtos Bancários</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/produtos">Produtos</Link>
        </nav>
      </header>
      <main style={{ marginTop: 20 }}>
        <Outlet />
      </main>
    </div>
  )
}
