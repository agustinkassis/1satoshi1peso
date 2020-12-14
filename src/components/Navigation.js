import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => (
  <div className="hidden">
    <ul>
      <li><Link to="/">Inicio</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </div>
)

export default Navigation
