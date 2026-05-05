import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Enhance from './pages/Enhance';
import Benchmark from './pages/Benchmark';
import Classify from './pages/Classify';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enhance" element={<Enhance />} />
          <Route path="/benchmark" element={<Benchmark />} />
          <Route path="/classify" element={<Classify />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
