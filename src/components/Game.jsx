import React, { useEffect } from 'react';
import Ball from './Ball';
import CanvasBoard from './CanvasBoard';
import Holder from './Holder';

const frameRate = 1/50; // Seconds
const frameDelay = frameRate * 1000; // 40fps

const Game = (props) => {
  const canvasRef = React.useRef(null);

  const { space } = props;
  let holder = new Holder();
  let ball = new Ball(frameRate, space);
  let board;

  useEffect(() => {
    board = new CanvasBoard(canvasRef, holder.moveCallback);
    board.initialize(ball, holder);
  }, []);

  const loop = () => {
    ball.move(holder);
    board.loop(ball, holder, space);
  }

  useEffect(() => {
    let id = setInterval(loop, frameDelay);
    return () => clearInterval(id);
  });

  const restart = () => {
    ball = new Ball(frameRate, space);
    holder = new Holder();
  }

  return (
    <div>
      <canvas
        style={{ border: '1px solid black'}}
        ref={canvasRef}
        width={space.width}
        height={space.height}
      />
      <br />
      <button onClick={restart}>Restart</button>
    </div>
  )
}

export default Game;