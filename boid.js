class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.color = lerpColor(color(133, 193, 233), color(40, 116, 166), random());
    // this.position = createVector(width / 2, height / 2);
    this.velocity = p5.Vector.random2D();
    this.accelaration = createVector();
    this.maxSpeed = 3;
    this.size = 5;
  }

  update() {
    this.steer(obstacles, 40, 10, -1);
    this.steer(boids, 25, 5, -1);
    this.steer(boids, 150, 1, 0.1);
    this.align(boids, 60, 0.5);
    this.velocity.add(this.accelaration);
    this.velocity.setMag(this.maxSpeed);
    this.position.add(this.velocity);
    this.accelaration.set(0, 0);
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
  }

  align(flock, radius, force) {
    let newVelocity = createVector();
    let totalNearbyBoids = 0;
    for (let boid of flock) {
      if (!sensorDetect(radius, this.position, boid.position) || boid == this) continue;
      newVelocity.add(boid.velocity);
      totalNearbyBoids++;
    }
    if (newVelocity.x == 0 && newVelocity.y == 0) return;
    newVelocity.x /= totalNearbyBoids;
    newVelocity.y /= totalNearbyBoids;

    // this.velocity = newVelocity;
    newVelocity.sub(this.velocity).limit(force);
    this.accelaration.add(newVelocity);
  }

  steer(flock, radius, strength, steerForce) {
    //get new Target (position)
    let newTarget = createVector();
    let totalNearbyBoids = 0;
    for (let boid of flock) {
      if (!sensorDetect(radius, this.position, boid.position) || boid == this) continue;
      newTarget.add(boid.position);
      totalNearbyBoids++;
    }
    if (newTarget.x == 0 && newTarget.y == 0) return;
    newTarget.x /= totalNearbyBoids;
    newTarget.y /= totalNearbyBoids;

    //steer towards that target (position)
    let desired = p5.Vector.sub(newTarget, this.position);
    desired.setMag(strength);
    desired.sub(this.velocity).limit(steerForce);
    this.accelaration.add(desired);
  }

  render() {
    fill(this.color);
    const angle = -this.velocity.heading();
    // line(
    //   this.position.x + this.size * cos(0) * cos(angle) + this.size * sin(0) * sin(angle),
    //   this.position.y - this.size * cos(0) * sin(angle) + this.size * sin(0) * cos(angle),
    //   this.position.x + this.size * 2 * cos(0) * cos(angle) + this.size * sin(0) * sin(angle),
    //   this.position.y - this.size * 2 * cos(0) * sin(angle) + this.size * sin(0) * cos(angle)
    // );
    triangle(
      this.position.x + this.size * 2 * cos(0) * cos(angle) + this.size * sin(0) * sin(angle),
      this.position.y - this.size * 2 * cos(0) * sin(angle) + this.size * sin(0) * cos(angle),
      this.position.x +
        this.size * 0.7 * cos((2 * PI) / 3) * cos(angle) +
        this.size * sin((2 * PI) / 3) * sin(angle),
      this.position.y -
        this.size * 0.7 * cos((2 * PI) / 3) * sin(angle) +
        this.size * 0.7 * sin((2 * PI) / 3) * cos(angle),
      this.position.x +
        this.size * 0.7 * cos((4 * PI) / 3) * cos(angle) +
        this.size * 0.7 * sin((4 * PI) / 3) * sin(angle),
      this.position.y -
        this.size * 0.7 * cos((4 * PI) / 3) * sin(angle) +
        this.size * 0.7 * sin((4 * PI) / 3) * cos(angle)
    );
  }
}
