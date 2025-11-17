import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Produtos(){
  const [produtos, setProdutos] = useState([])

  useEffect(()=>{
    api.get('/produtos').then(r => setProdutos(r.data)).catch(console.error)
  },[])

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {produtos.map(p => (
          <li key={p.id}><strong>{p.nome}</strong> — {p.categoria} — taxa: {p.taxa}</li>
        ))}
      </ul>
    </div>
  )
}
