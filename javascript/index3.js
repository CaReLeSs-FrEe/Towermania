const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const myScore = document.querySelector('h2 span')

const gravity = 0.3;

canvas.width = 720
canvas.height = 480

let myPlatforms = []
let myFrameCount = 0;

//ctx.fillRect(0, 0, 50, 50);

class Player {

    constructor(x,y, width, height){
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.canJump = true;
        this.width = width;
        this.height = height;
    }

    move(){
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    collideWith(p){
        if (this.x < p.x + p.width &&
            this.x + this.width > p.x &&
            this.y < p.y + p.height &&
            this.height + this.y > p.y) {
            // Collision detected!
            console.log('collided')
            if(this.vy >= 0){
                this.vy = 0;
                //this.vx = 0;
                this.canJump = true;
            } else {
                //we probably don't want to do anything because it means we are jumping through platform
            }
    
        }
    }

}

class Platform {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.vy = 2;
        this.width = width;
        this.height = height;
    }

    move(){
        this.y += this.vy;
    }

    draw(){
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

let myPlayer = new Player(100, 180, 20, 20)

myPlatforms.push(new Platform(100, 200, 200, 30))
//myPlatforms.push(new Platform(100, 200, 200, 30))
myPlatforms.push(new Platform(300, 50, 200, 30))

window.addEventListener('keydown', e => {
    switch(e.code){
        case 'ArrowUp':
            console.log('press up')
            if(myPlayer.canJump){
                myPlayer.vy = -10;
                myPlayer.canJump = false;
            }
            break;
        case 'Space':
            console.log('press space')
            if(myPlayer.canJump){
                myPlayer.vy = -10;
                myPlayer.canJump = false;
            }
            break;
        case 'ArrowLeft':
            console.log('press left')
            if(myPlayer.vx > -15){
                myPlayer.vx -= 1;
            }
            
            break;
        case 'ArrowRight':
            console.log('press right')
            if(myPlayer.vx < 15){
                myPlayer.vx += 1;
            }
            
            break;
    }
})

let myIntervalId = setInterval(() => {

    myFrameCount++;

    if(myFrameCount % 60 == 0){
        let randomX = Math.floor((Math.random() * 520) + 100);
        myPlatforms.push(new Platform(randomX, -30, 200, 30))
    }
    //console.log(ctx, ctx.clearRect)
    ctx.clearRect(0, 0, 720, 480)

    for(let i  = 0; i < myPlatforms.length; i++){
        myPlayer.collideWith(myPlatforms[i])
        myPlatforms[i].move();
        myPlatforms[i].draw();
    }
    myPlayer.vy += gravity;
    myPlayer.move();
    myPlayer.draw();

    if(myPlayer.y >= 580){
        clearInterval(myIntervalId)
        alert('game over - you fell too far off the screen!', window.location.reload()) 
        
    }

    for(let i  = myPlatforms.length - 1; i >= 0; i--){
        if(myPlatforms[i].y > 600){
            myPlatforms.splice(i, 1);
            myScore.textContent = Number(myScore.textContent) + 1
        }
    }
    
}, 20)