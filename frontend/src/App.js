import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing } from './pages/landing';
import './App.css';
import { Home } from './pages/home';
// import { Top } from './components/top';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path='/home' element={<Home />} exact />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
