import React, { useEffect } from 'react';
import Ball from './Ball';
import CanvasBoard from './CanvasBoard';

const frameRate = 1/40; // Seconds
const frameDelay = frameRate * 1000; // 40fps

const Game = (props) => {
  const canvasRef = React.useRef(null);

  const { space } = props;

  const ball = new Ball(frameRate, space);
  let board;

  useEffect(() => {
    board = new CanvasBoard(canvasRef);
    board.initialize(ball);
  }, []);

  const loop = () => {
    board.loop(ball, space);
  }

  setInterval(loop, frameDelay);

  return (
    <div>
      <canvas
        style={{ border: '1px solid black'}}
        ref={canvasRef}
        width={space.width}
        height={space.height}
      />
    </div>
  )
}

export default Game;