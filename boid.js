class Boid {
  constructor() {
    // this.position = createVector(random(width), random(height));
    this.position = createVector(width / 2, height / 2);
    this.velocity = p5.Vector.random2D();
    this.accelaration = createVector();
    this.maxSpeed = 2;
    this.size = 5;
  }

  update() {
    this.steer(boids, "position", 20, -0.2);
    // this.steer(boids, "position", 100, 0.07);
    this.steer(boids, "velocity", 50, 1);
    this.velocity.add(this.accelaration);
    this.velocity.setMag(this.maxSpeed);
    this.position.add(this.velocity);
    this.accelaration.set(0, 0);
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
  }

  steer(flock, target, radius, force) {
    //get new Target (position)
    let newTarget = createVector();
    let totalNearbyBoids = 0;
    for (let boid of flock) {
      if (!sensorDetect(radius, this.position, boid.position) || boid == this) continue;
      newTarget.add(boid[target]);
      totalNearbyBoids++;
    }
    if (newTarget.x == 0 && newTarget.y == 0) return;
    newTarget.x /= totalNearbyBoids;
    newTarget.y /= totalNearbyBoids;

    //steer towards that target (position)
    let desired = p5.Vector.sub(newTarget, this[target]).mult(force);
    this.accelaration.add(desired);
  }

  render() {
    const angle = -this.velocity.heading();
    line(
      this.position.x + this.size * cos(0) * cos(angle) + this.size * sin(0) * sin(angle),
      this.position.y - this.size * cos(0) * sin(angle) + this.size * sin(0) * cos(angle),
      this.position.x + this.size * 2 * cos(0) * cos(angle) + this.size * sin(0) * sin(angle),
      this.position.y - this.size * 2 * cos(0) * sin(angle) + this.size * sin(0) * cos(angle)
    );
    triangle(
      this.position.x + this.size * cos(0) * cos(angle) + this.size * sin(0) * sin(angle),
      this.position.y - this.size * cos(0) * sin(angle) + this.size * sin(0) * cos(angle),
      this.position.x + this.size * cos((2 * PI) / 3) * cos(angle) + this.size * sin((2 * PI) / 3) * sin(angle),
      this.position.y - this.size * cos((2 * PI) / 3) * sin(angle) + this.size * sin((2 * PI) / 3) * cos(angle),
      this.position.x + this.size * cos((4 * PI) / 3) * cos(angle) + this.size * sin((4 * PI) / 3) * sin(angle),
      this.position.y - this.size * cos((4 * PI) / 3) * sin(angle) + this.size * sin((4 * PI) / 3) * cos(angle)
    );
  }
}
