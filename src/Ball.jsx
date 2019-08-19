const MASS = 0.1; //kg
const RADIUS = 15; // 1px = 1cm
const COEFICIENT_RESTITUTION = -0.6;
const DENSITY_FLUID = 1.22; // kg / m^3
const CONTACT_AREA = Math.PI * RADIUS * RADIUS / (10000);
const GRAVITY = 9.81; // m/s^2

class Ball {
  constructor (frameRate, space) {
    this.RADIUS = 15;
    this.position = { x: 250, y: 50};
    this.velocity = { x: 0, y: 0};
    this.hitFlowCounter = 0;
    this.frameRate = frameRate;
    this.space = space;
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

  /**
   * Calculate new position using previous values of velocity and position
   */
  calculatePosition = () => {
    return {
      x: this.position.x + this.velocity.x * this.frameRate * 100, // convert m to cm
      y: this.position.y + this.velocity.y * this.frameRate * 100, // convert m to cm
    };
  }

  /**
   * Calculate new vector of velocity
   * 
   * @param acceleration current vector of acceleration
   */
  calculateVelocity = (acceleration) => {
    return {
      x: this.velocity.x + acceleration.x * this.frameRate,
      y: this.velocity.y + acceleration.y * this.frameRate,
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

    if (newPosition.y > this.space.height - RADIUS) {
      newVelocity.y *= COEFICIENT_RESTITUTION;
      newPosition.y = this.space.height - RADIUS;

      // update times that ball hit the flow
      this.hitFlowCounter = this.hitFlowCounter + 1;
    }

    if (newPosition.x > this.space.width - RADIUS) {
      newVelocity.x *= COEFICIENT_RESTITUTION;
      newPosition.x = this.space.width - RADIUS;
    }

    if (newPosition.x < RADIUS) {
      newVelocity.x *= COEFICIENT_RESTITUTION;
      newPosition.x = RADIUS;
    }

    return [ newVelocity, newPosition ];
  }

  move = () => {
    let Fx = this.calculateForce(this.velocity.x);
    let Fy = this.calculateForce(this.velocity.y);

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

    this.velocity = velocityAfterColision;
    this.position = positionAfterColision;
  }
}

export default Ball;