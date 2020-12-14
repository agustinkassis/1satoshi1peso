import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="container">
    <p className="float-right"><Link to="#">Volver arriba</Link></p>
    <p>
      &copy; 2020 1 Peso 1 Dolar &middot;
      <Link to="#">Github</Link> &middot;
    </p>
  </footer>
)

export default Footer
