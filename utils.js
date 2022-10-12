const sensorDetect = (sensorRadius, position1, position2) => {
  return (
    pow(position1.y - position2.y, 2) + pow(position1.x - position2.x, 2) <= pow(sensorRadius, 2)
  );
};

class Obstacle {
  constructor() {
    this.position = createVector(random(width), random(height));
  }
  render() {
    circle(this.position.x, this.position.y, 8);
  }
}
