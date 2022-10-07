let boids = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  fill(255);
  stroke(255);

  for (let i = 0; i < 200; i++) boids.push(new Boid());
}

function draw() {
  background(0);

  for (let boid of boids) {
    boid.update();
    boid.render();
  }
}
