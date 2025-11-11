import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ItemListContainer.css'; 

const Item = ({ product }) => {
    return (
        <div className="item-card">
            <h3 className="item-title">{product.name}</h3>
            <p className="item-price">${product.price.toFixed(2)}</p>
            <p className="item-category">Categoría: {product.category}</p>
            <Link to={`/item/${product.id}`} className="item-detail-link">
                Ver Detalles
            </Link>
        </div>
    );
};

const mockProducts = [
    { id: '1', name: 'Smart TV 55"', price: 850, category: 'electronica', description: 'Televisor 4K con tecnología OLED.', stock: 5 },
    { id: '2', name: 'Cafetera Programable', price: 90, category: 'hogar', description: 'Cafetera con temporizador y filtro permanente.', stock: 12 },
    { id: '3', name: 'Auriculares Inalámbricos', price: 120, category: 'electronica', description: 'Cancelación de ruido y 24 horas de batería.', stock: 3 },
    { id: '4', name: 'Juego de Sábanas King', price: 65, category: 'hogar', description: '100% algodón egipcio, 400 hilos.', stock: 8 },
    { id: '5', name: 'Licuadora de Alta Potencia', price: 150, category: 'ofertas', description: 'Perfecta para batidos y triturar hielo.', stock: 10 },
];

const getProducts = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (categoryId) {
                const filtered = mockProducts.filter(
                    product => product.category.toLowerCase() === categoryId.toLowerCase()
                );
                resolve(filtered);
            } else {
                resolve(mockProducts);
            }
        }, 1500); 
    });
};

export const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const { categoryId } = useParams(); 
    
    useEffect(() => {
        setProducts([]);
        setLoading(true); 
        
        getProducts(categoryId) 
            .then((data) => {
                setProducts(data); 
            })
            .catch((error) => {
                console.error("Error al cargar productos:", error);
            })
            .finally(() => {
                setLoading(false); 
            });
            
    }, [categoryId]);

    const title = categoryId 
        ? `Catálogo: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}` 
        : 'CATÁLOGO DE PRODUCTOS COMPLETO';

    return (
        <main className="item-list-main">
            <div className="item-list-card">
                <h1>{title}</h1>
                
                <p className="greeting-message">
                    {greeting}
                </p>
                
                {loading ? (
                    <div className="product-placeholder">
                        Cargando productos, espere un momento... ⏳
                    </div>
                ) : (
                    <div className="product-list">
                        <h2>Productos Encontrados ({products.length})</h2>
                        <div className="items-grid">
                            {products.map(product => (
                                <Item key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};