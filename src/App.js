import React from 'react';
import './App.css';
import Game from './Game';

const DIMENSIONS = {
  width: 500, 
  height: 500,
};

function App() {
  return (
    <div className="App">
      <Game space={DIMENSIONS} />
    </div>
  );
}

export default App;
