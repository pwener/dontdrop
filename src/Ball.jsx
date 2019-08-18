import React from 'react';

const MASS = 0.1; //kg
const RADIUS = 15; // 1px = 1cm
const COEFICIENT_RESTITUTION = -0.6;
const DENSITY_FLUID = 1.22; // kg / m^3
const CONTACT_AREA = Math.PI * RADIUS * RADIUS / (10000);
const GRAVITY = 9.81; // m/s^2

const frameRate = 1/40; // Seconds
const frameDelay = frameRate * 1000; // 40fps

class Ball extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      position: { x: 250, y: 50},
      velocity: { x: 0, y: 0},
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    const { position } = this.state;
    ctx.arc(position.x, position.y, RADIUS, 0, 2 * Math.PI);
    ctx.stroke();

    const looperTime = setInterval(this.loop, frameDelay);
  }

  loop = () => {
    this.moveBall();
  }

  /**
   * Calculate vector of force using velocity vector
   * 
   * @param velocity is a vector of velocity
   */
  calculateForce = (velocity) => {
    const sign = velocity / Math.abs(velocity);

    return -0.5 * CONTACT_AREA * DENSITY_FLUID * velocity * velocity * sign;
  }

  calculatePosition = () => {
    const { velocity, position } = this.state;

    return {
      x: position.x + velocity.x * frameRate * 100, // convert m to cm
      y: position.y + velocity.y * frameRate * 100, // convert m to cm
    };
  }

  calculateVelocity = (acceleration) => {
    const { velocity } = this.state;

    return {
      x: velocity.x + acceleration.x * frameRate,
      y: velocity.y + acceleration.y * frameRate,
    };
  }

  /**
   * Calculates the velocity and position when object collides
   * 
   * @param velocity current vector of velocity
   * @param position current vector of position
   */
  handleColisions = (velocity, position) => {
    const newVelocity = Object.assign({}, velocity);
    const newPosition = Object.assign({}, position);

    if (newPosition.y > 500 - RADIUS) {
      newVelocity.y *= COEFICIENT_RESTITUTION;
      newPosition.y = 500 - RADIUS;
    }

    if (newPosition.x > 500 - RADIUS) {
      newVelocity.x *= COEFICIENT_RESTITUTION;
      newPosition.x = 500 - RADIUS;
    }

    if (newPosition.x < RADIUS) {
      newVelocity.x *= COEFICIENT_RESTITUTION;
      newPosition.x = RADIUS;
    }

    return [ newVelocity, newPosition ];
  }

  /**
   * 
   */
  moveBall = () => {
    const { velocity } = this.state;

    let Fx = this.calculateForce(velocity.x);
    let Fy = this.calculateForce(velocity.y);

    Fx = (isNaN(Fx) ? 0 : Fx);
    Fy = (isNaN(Fy) ? 0 : Fy);

    // Calculate acceleration ( F = ma )
    const acceleration = {
      x: Fx / MASS,
      y: GRAVITY + (Fy / MASS),
    };

    // Integrate to get position
    const newPosition = this.calculatePosition();

    // Integrate to get velocity
    let newVelocity = this.calculateVelocity(acceleration);

    const [
      velocityAfterColision,
      positionAfterColision
    ] = this.handleColisions(newVelocity, newPosition);

    this.setState({
      velocity: velocityAfterColision,
      position: positionAfterColision,
    }, this.updateCanvas);
  }

  updateCanvas = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0, 500, 500);
    
    ctx.save();
    const { position } = this.state;

    ctx.translate(position.x, position.y);
    ctx.beginPath();
    ctx.arc(0, 0, RADIUS, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }

  render() {
    return(
      <div>
        <canvas
          style={{ border: '1px solid black'}}
          ref="canvas"
          width={500}
          height={500}
        />
      </div>
    )
  }
}

export default Ball;