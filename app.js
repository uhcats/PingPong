
// Get canvas and context
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


// get canvas width and height
canvas.width = innerWidth;
canvas.height = innerHeight;

// Create paddle
class Paddle {
  constructor({ position }) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.width = 10;
    this.height = 100;
  }

  draw() {
    c.fillStyle = 'white'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw();

    if (
      this.position.y + this.velocity.y > 0
      &&
      this.position.y + this.height + this.velocity.y < canvas.height) {

      this.position.y += this.velocity.y
    }


  }
}

// Create Ball

class Ball {
  constructor({ position }) {

    const speed = 5;
    const direction = {
      x: Math.random() - 0.5 >= 0 ? -speed : speed,
      y: Math.random() - 0.5 >= 0 ? -speed : speed,
    }
    this.position = position;
    this.velocity = {
      x: direction.x,
      y: direction.y,
    }

    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = 'white';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    const rightSide = this.position.x + this.width + this.velocity.x;
    const leftSide = this.position.x + this.velocity.x

    const bottomSide = this.position.y + this.height;
    const topSide = this.position.y;

    // paddle 1 collision 
    if (
      leftSide <= paddle1.position.x + paddle1.width
      && bottomSide >= paddle1.position.y
      && topSide <= paddle1.position.y + paddle1.height) {
      this.velocity.x = -this.velocity.x;
    }

    // paddle 2 collistion

    if (
      rightSide >= paddle2.position.x + paddle2.width
      && bottomSide >= paddle2.position.y
      && topSide <= paddle2.position.y + paddle2.height) {
      this.velocity.x = -this.velocity.x;
    }

    // reverse y direction
    console.log(this.position.y, canvas.height)
    if (
      this.position.y + this.height + this.velocity.y >= canvas.height
      ||
      this.position.y + this.velocity.y <= 0) {

      this.velocity.y = -this.velocity.y;
    }



    // Move ball 
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

// Player paddle 1 instancy
const paddle1 = new Paddle({
  position: {
    x: 10,
    y: 100,
  },
})

// Player paddle 2 instancy
const paddle2 = new Paddle({
  position: {
    x: canvas.width - 10 * 2,
    y: 100,
  },
})

// Ball instancy
const ball = new Ball({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2
  }
})


// Call function whenever paddle1 or paddle2 or ball update, so how sth change position
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  paddle1.update();
  paddle2.update();
  ball.update();
}

animate();

addEventListener('keydown', (event) => {
  const speed = 8;
  switch (event.key) {
    case "w":
      // go up
      paddle1.velocity.y = -speed
      break;
    case "s":
      // go down
      paddle1.velocity.y = speed
      break;

    case "ArrowUp":
      // go up
      paddle2.velocity.y = -speed
      break;
    case "ArrowDown":
      // go down
      paddle2.velocity.y = speed
      break;
  }
})

