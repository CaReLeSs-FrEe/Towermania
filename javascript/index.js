const myGameArea = {
  canvas: document.querySelector("canvas"),
  frames: 0,
  start: function () {
    this.canvas.width = 720;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateGameArea, 5);
  },
  startOver: function () {
    let btn = window.addEventListener("Click");
    btn.onclick = (event) => {
      myGameArea.clear();
      myGameArea.start();
    };
    // myGameArea.clear()
    // myGameArea.start()
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const score = Math.floor(this.frames / 5);
    this.context.font = '20px serif';
    this.context.fillText(`Score: ${score}`, 20, 50);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};

class Player {
  constructor(x, y, width, height, color) {
    this.originalStartingPointY = y
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.followingPlatform = false;
  }

  // or update
  draw() {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  stopFallingAndFollow(obstacle) {
    const playerTouchingTop = this.bottom() >= obstacle.top() && this.bottom() <= (obstacle.bottom() - obstacle.height * .95)
    const playerWithinObstacleRight = this.right() <= obstacle.right() && this.right() >= obstacle.left()
    const playerWithinObstacleLeft = this.left() >= obstacle.left() && this.left() <= obstacle.right()
    if (playerTouchingTop && (playerWithinObstacleRight || playerWithinObstacleLeft)) {
      this.speedY = 0 // Allow to follow downwards
      this.y += 1 // Allow to follow downwards
      return true
    }
    return false
  }

//   standOn() {
//     for (let i =0; i > myObstacles.length; i++) {
//         if ((player.x >= myObstacles[i].x) && (player.x + player.width <= myObstacles[i].x + myObstacles[i].width) && (player.y + player.height == myObstacles[i].y)  ) {
//             player.speedy = 0.5
//         }
//     }
//    }




// if (player.speedy > 0) {
//     player.standOn()
// }

  //crashWith(obstacle) {
  // return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
//   standOn() {
//     return this.bottom() >= myObstacles.height + this.height;
//   }

  fallUnder() {
    if (this.bottom() - this.height * 0.75 > myGameArea.canvas.height) {
      alert("GAME OVER!", window.location.reload());
    }
  }
}
const myObstacles = [
  new Player(Math.random() * 720, myGameArea.canvas.height, 720, 30, "brown"),
  new Player(Math.random() * 720, myGameArea.canvas.height, 70, 30, "brown"),
  new Player(Math.random() * 720, myGameArea.canvas.height, 100, 30, "brown"),
];

const player = new Player(260, 360, 30, 50, "black");

const keys = []; // { 'Space': false, 'ArrowUp': false }

window.addEventListener(
  "keydown",
  (event) => {
    // store an entry for every key pressed
    keys[event.code] = true;

    if (keys["ArrowUp"]) {
      player.speedY -= 1;
    }
    if (keys["Space"]) {
      player.speedY -= 1;
    }
    if (keys["ArrowLeft"]) {
      player.speedX -= 1;
    }
    if (keys["ArrowRight"]) {
      player.speedX += 1;
    }
  },
  false
);

window.addEventListener(
  "keyup",
  (event) => {
    // mark keys that were released
    keys[event.code] = false;
    player.speedX = 0;
    player.speedY = 1;
  },
  false
);

// 120 < x < 600
function updatePlatforms() {
  for (i = 0; i < myObstacles.length; i++) {
      myObstacles[i].y += 1; // adding to the y value allows you to move down the y axis (higher y values means you are going down on the screen)
      if (myObstacles[i].y > (myGameArea.canvas.height + player.height)) myObstacles.splice(i,1); // makes sure to remove obstacles that are no longer "in frame"
      else myObstacles[i].draw();
  }

  myGameArea.frames += 1;
  if (myObstacles.length < 1 || myGameArea.frames % 300 === 0) { // determines when to pop in a new obstacles from the top
    let y = 0; // starting at zero allows you to start at the top of the screen
    let minWidth = 100;
    let maxWidth = 250;
    let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    let minX = 400;
    let maxX = 650;
    let x = Math.floor(Math.random() * (minX - maxX + 1) + minX);
    myObstacles.push(new Player(x, y, width, 30, 'brown'));
  }
}

const checkGameOver = () => {
  player.fallUnder();
};

myGameArea.start();
// const platforms = new Platforms();

// document.addEventListener("keyup", (event) => {
//   player.speedX = 0;
//   player.speedY = .5;
// });

function updateGameArea() {
  myGameArea.clear();
  // update the player's position before drawing
  player.newPos();
  for(let count = 0; count < myObstacles.length; count++) {
    player.stopFallingAndFollow(myObstacles[count]);
  }
  player.draw();
  updatePlatforms();
  checkGameOver();
}

//     draw() {
//       // Creates one platform
//       ctx.fillStyle = this.color;
//       ctx.fillRect(this.x, this.y, this.width, this.height);

//       ctx.drawImage(this.platform, this.x, this.y);
//       if (this.speed > 0) {
//         ctx.drawImage(this.platform, this.x, this.y + this.platform.height);
//       } else {
//         ctx.drawImage(this.platform, this.x, this.y - backgroundCanvas.height);
//       }
//     }
// }

// const platform = new Platforms(x, y, width, height, 'brown')

// const ctx = myGameArea.context;
// ctx.fillStyle = "brown";
// ctx.fillRect(100, 450, 520, 30);

// ctx.fillStyle = "brown";
// ctx.fillRect(260, 260, 100, 30);

// ctx.fillStyle = "brown";
// ctx.fillRect(100, 260, 100, 30);

// ctx.fillStyle = "brown";
// ctx.fillRect(520, 100, 100, 30);

// ctx.fillStyle = "brown";
// ctx.fillRect(260, 30, 100, 30);

// Left Dark Grey Smaller Panel
// ctx.fillStyle = "grey";
// ctx.fillRect(70, 0, 30, 480);
// // Left Light Grey Larger Panel
// ctx.fillStyle = "darkgrey";
// ctx.fillRect(0, 0, 70, 480);

// // Right Dark Grey Smaller Panel
// ctx.fillStyle = "grey";
// ctx.fillRect(620, 0, 30, 480);
// // Right Light Grey Larger Panel
// ctx.fillStyle = "darkgrey";
// ctx.fillRect(650, 0, 70, 480);
