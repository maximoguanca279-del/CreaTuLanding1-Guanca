import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartWidget } from './CartWidget';
import './NavBar.css'; 

export const NavBar = ({ totalItemsInCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Electrónica', path: '/category/electronica' },
    { name: 'Hogar', path: '/category/hogar' },
    { name: 'Ofertas', path: '/category/ofertas' },
  ];

  return (
    <header className="navbar-header">
      
      <div className="navbar-container">
          
        <div className="logo">
          <Link to="/">Mi Tienda</Link>
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
            <NavLink 
              key={link.name} 
              to={link.path} 
              className={({ isActive }) => "nav-item" + (isActive ? " active-link" : "")}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="cart-container">
          <Link to="/cart"> 
            <CartWidget count={totalItemsInCart} />
          </Link>
        </div>

      </div>
      
      <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`}>
          <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link 
                  key={`mobile-${link.name}`} 
                  to={link.path} 
                  className="mobile-nav-item" 
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
          </nav>
          <div className="mobile-cart-container">
              <Link to="/cart" onClick={() => setIsOpen(false)}>
                <CartWidget count={totalItemsInCart} />
              </Link>
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