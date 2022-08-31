const myGameArea = {
  canvas: document.querySelector("canvas"),
  frames: 0,
  start: function () {
    this.canvas.width = 720;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateGameArea, 5);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};

class Player {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
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
 
  crashWith(obstacle) {
    return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
  }
}
const myObstacles = [
  new Player(Math.random() * 720, myGameArea.canvas.height, 720, 30, "brown"),
  new Player(Math.random() * 720, myGameArea.canvas.height, 70, 30, "brown"),
  new Player(Math.random() * 720, myGameArea.canvas.height, 100, 30, "brown"),
];

const player = new Player(260, 360, 30, 50, "black");

document.addEventListener("keydown", (event) => {
  player.speedY = 0;
  player.speedX = 0;


  switch (event.code) {
    case "Space": // spacebar
      player.speedY -= 1;

      break;
    case "ArrowUp": // up arrow
      player.speedY -= 1;
      break;
    case "ArrowLeft": // left arrow
      player.speedX -= 1;
      break;
    case "ArrowRight": // right arrow
      player.speedX += 1;
      break;
  }
});
// 120 < x < 600
const updatePlatforms = () => {
  for (i = 0; i > myObstacles.length; i++) {
    myObstacles[i].y -= -1;
    myObstacles[i].draw();
    
  }
  myGameArea.frames += 1;
  if (myGameArea.frames % 120 === 0) {
    let y = myGameArea.canvas.height;
    let minWidth = 150;
    let maxWidth = 250;
    let width = Math.floor(
      Math.random() * (maxWidth - minWidth + 1) + minWidth
    );
    let minGap = 0;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 5) + minGap);
    myObstacles.push(new Player(Math.random() * 720, y, width, 30, "brown"));
  }
};
const checkGameOver = () => {
    const crashed = myObstacles.some(function (obstacle) {
      return player.crashWith(obstacle);
    });
  
    if (fallOffScreen) {
      myGameArea.stop();
    }
}
  
myGameArea.start()
// const platforms = new Platforms();

document.addEventListener("keyup", (event) => {
  player.speedX = 0;
  player.speedY = .5;
  

});

function updateGameArea() {
  myGameArea.clear();
  // update the player's position before drawing
  player.newPos();
  player.draw();
  updatePlatforms();
  //   checkGameOver();
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
