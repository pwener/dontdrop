import React from 'react';
import './App.css';
import Ball from './Ball';

const DIMENSIONS = {
  width: 500, 
  height: 500,
};

function App() {
  return (
    <div className="App">
      <Ball space={DIMENSIONS} />
    </div>
  );
}

export default App;
