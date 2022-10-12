let boids = [];
let obstacles = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();

  for (let i = 0; i < 100; i++) boids.push(new Boid());
  for (let i = 0; i < 10; i++) obstacles.push(new Obstacle());
}

function draw() {
  background(25, 36, 47);

  for (let boid of boids) {
    boid.update();
    boid.render();
  }
  fill(255, 0, 0);
  for (let obstacle of obstacles) obstacle.render();
}
