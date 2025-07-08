import React from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>Product List</h1>
        </div>
      </header>
      
      <main className="App-main">
        <div className="container">
          <ProductList />
        </div>
      </main>
      
      <footer className="App-footer">
        <div className="container">
          <p>&copy; 2024 Jewelry Collection. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 