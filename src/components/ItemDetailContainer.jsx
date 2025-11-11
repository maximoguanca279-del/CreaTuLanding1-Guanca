import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ItemCount } from './ItemCount';
import './ItemDetailContainer.css';

const mockProducts = [
    { id: '1', name: 'Smart TV 55"', price: 850, category: 'electronica', description: 'Televisor 4K con tecnología OLED. Experiencia inmersiva garantizada.', stock: 5 },
    { id: '2', name: 'Cafetera Programable', price: 90, category: 'hogar', description: 'Cafetera con temporizador, filtro permanente y capacidad para 12 tazas.', stock: 12 },
    { id: '3', name: 'Auriculares Inalámbricos', price: 120, category: 'electronica', description: 'Cancelación de ruido, audio Hi-Res y 24 horas de batería. Ligeros y cómodos.', stock: 3 },
    { id: '4', name: 'Juego de Sábanas King', price: 65, category: 'hogar', description: '100% algodón egipcio, 400 hilos, tacto suave y fresco. Incluye 4 piezas.', stock: 8 },
    { id: '5', name: 'Licuadora de Alta Potencia', price: 150, category: 'ofertas', description: 'Motor de 1500W, perfecta para batidos, sopas y triturar hielo. Jarra de vidrio.', stock: 10 },
];

const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = mockProducts.find(p => p.id === id);
            if (product) {
                resolve(product);
            } else {
                reject(new Error(`Producto con ID ${id} no encontrado`));
            }
        }, 1500); 
    });
};

export const ItemDetailContainer = ({ addItem }) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true);
        getProductById(itemId)
            .then((data) => {
                setItem(data);
            })
            .catch((error) => {
                console.error("Error al cargar producto:", error);
                setItem(null);
            })
            .finally(() => {
                setLoading(false);
            });
            
    }, [itemId]);

    const onAdd = (count) => {
        if (item) {
            addItem(item, count);
            navigate('/cart');
        }
    };

    if (loading) {
        return (
            <div className='item-detail-main'>
                <div className='detail-card loading'>
                    Cargando detalles del producto... 🔍
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className='item-detail-main'>
                <div className='detail-card error'>
                    Producto no encontrado.
                </div>
            </div>
        );
    }

    return (
        <div className='item-detail-main'>
            <div className='detail-card'>
                <h1 className="detail-title">{item.name}</h1>
                
                <div className="detail-content">
                    <div className="product-image-placeholder">
                        <div className="image-placeholder">
                                                    </div>
                    </div>
                    
                    <div className="product-info">
                        <p className="detail-price">${item.price.toFixed(2)}</p>
                        <p className="detail-category">Categoría: {item.category.toUpperCase()}</p>
                        <p className="detail-description">{item.description}</p>
                        
                        <div className="item-count-section">
                            <ItemCount 
                                stock={item.stock} 
                                initial={1} 
                                onAdd={onAdd}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};