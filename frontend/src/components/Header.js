import React, { useState } from 'react';

export default function Header({ onNavigate }) {
  const [open, setOpen] = useState(false);
  function navTo(route) {
    window.location.hash = '#'+route;
    setOpen(false);
  }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand" onClick={()=>navTo('home')}>
          <img src="/logo.png" alt="logo" className="logo" />
          <span className="brand-name">My Restaurant</span>
        </div>
        <nav className={`nav ${open ? 'open' : ''}`}>
          <a onClick={()=>navTo('home')}>Home</a>
          <a onClick={()=>navTo('menu')}>Menu</a>
          <a onClick={()=>navTo('cart')}>Cart</a>
          <a onClick={()=>navTo('about')}>About</a>
          <a onClick={()=>navTo('contact')}>Contact</a>
        </nav>
        <button className="hamburger" onClick={()=>setOpen(!open)} aria-label="menu">
          ☰
        </button>
      </div>
    </header>
  );
}