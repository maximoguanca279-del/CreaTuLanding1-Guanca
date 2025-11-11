import React, { useState } from 'react';
import './ItemCount.css';

export const ItemCount = ({ stock, initial, onAdd }) => {
    const [count, setCount] = useState(initial);

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const increment = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };
    
    const handleAdd = () => {
        onAdd(count);
    };

    return (
        <div className="item-count-widget">
            <div className="controls">
                <button onClick={decrement} disabled={count === 1}>
                    -
                </button>
                <span className="count-display">{count}</span>
                <button onClick={increment} disabled={count === stock}>
                    +
                </button>
            </div>
            <button 
                onClick={handleAdd} 
                disabled={stock === 0}
                className="add-to-cart-button"
            >
                {stock === 0 ? 'Sin Stock' : `Agregar ${count} al Carrito`}
            </button>
            {stock > 0 && <p className="stock-info">Stock disponible: {stock}</p>}
        </div>
    );
};