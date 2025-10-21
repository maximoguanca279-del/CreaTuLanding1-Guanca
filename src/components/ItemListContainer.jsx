import React from 'react';
import './ItemListContainer.css'; 

export const ItemListContainer = ({ greeting }) => {
  return (
    <main className="item-list-main">
      <div className="item-list-card">
        <h1>CATÁLOGO DE PRODUCTOS</h1>
        
        <p className="greeting-message">
          {greeting}
        </p>
        
        <div className="product-placeholder">
            Aquí se listarán los productos
        </div>
      </div>
    </main>
  );
};