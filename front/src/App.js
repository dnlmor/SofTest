import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from './components/Item/ItemList';
import ItemCreate from './components/Item/ItemCreate';
import ItemEdit from './components/Item/ItemEdit';
import ItemView from './components/Item/ItemView';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/create" element={<ItemCreate />} />
          <Route path="/edit/:id" element={<ItemEdit />} />
          <Route path="/view/:id" element={<ItemView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
