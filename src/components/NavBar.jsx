import React, { useState } from 'react';
import { CartWidget } from './CartWidget';
import './NavBar.css'; 

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Electrónica', href: '#' },
    { name: 'Hogar', href: '#' },
    { name: 'Ofertas', href: '#' },
  ];

  return (
    <header className="navbar-header">
      
      <div className="navbar-container">
          
        <div className="logo">
          <a href="#">Mi Tienda</a>
        </div>

        <button className="hamburger-button" onClick={() => setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hamburger-icon">
                {isOpen ? (
                    <path d="M18 6 6 18M6 6l12 12"/>
                ) : (
                    <path d="M4 12h16M4 6h16M4 18h16"/>
                )}
            </svg>
        </button>

        <nav className="nav-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-item">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="cart-container">
          <CartWidget />
        </div>

      </div>
      
      <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`}>
          <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <a key={`mobile-${link.name}`} href={link.href} className="mobile-nav-item" onClick={() => setIsOpen(false)}>
                  {link.name}
                </a>
              ))}
          </nav>
          <div className="mobile-cart-container">
              <CartWidget />
          </div>
      </div>
      
      <div className="search-bar-container">
        <div className="search-form-wrapper">
            <input 
                type="text" 
                placeholder="Buscar productos..." 
                className="search-input"
            />
            <button className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
        </div>
      </div>
      
    </header>
  );
};