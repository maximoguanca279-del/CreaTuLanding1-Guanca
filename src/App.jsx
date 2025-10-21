import React from 'react';
import { NavBar } from './components/NavBar';
import { ItemListContainer } from './components/ItemListContainer';
import '../src/index.css'; 

export default function App() {
  const welcomeMessage = "¡Bienvenido/a a mi tienda virtual!";

  return (
    <div className="app-container"> 
      
      <NavBar />
      
      <main> 
        <ItemListContainer greeting={welcomeMessage} />
      </main>
      
      <footer className="app-footer"> 
        &copy; 2025 Entrega1-Guanca.
      </footer>
    </div>
  );
}