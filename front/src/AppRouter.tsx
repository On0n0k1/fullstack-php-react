import { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddProduct from './pages/AddProduct';

import './App.css';

const AppRouter: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;