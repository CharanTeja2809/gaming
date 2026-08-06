const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let playerScore = 0;
let aiScore = 0;

const WIN_SCORE = 10;

let gameRunning = true;

const paddleWidth = 15;
const paddleHeight = 100;

let player = {
    x:20,
    y:HEIGHT/2-50,
    width:paddleWidth,
    height:paddleHeight
};

let ai = {
    x:WIDTH-35,
    y:HEIGHT/2-50,
    width:paddleWidth,
    height:paddleHeight
};

let ball={
    x:WIDTH/2,
    y:HEIGHT/2,
    radius:10,
    speedX:5,
    speedY:5
};

canvas.addEventListener("mousemove",e=>{
    const rect=canvas.getBoundingClientRect();
    player.y=e.clientY-rect.top-player.height/2;
});

function drawRect(x,y,w,h,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}

function drawCircle(x,y,r,color){
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();
}

function drawNet(){

    for(let i=0;i<HEIGHT;i+=30){
        drawRect(WIDTH/2-2,i,4,20,"white");
    }

}

function drawText(text,x,y){

    ctx.fillStyle="white";
    ctx.font="35px Arial";
    ctx.fillText(text,x,y);

}

function collision(ball,paddle){

    return(
        ball.x-ball.radius<paddle.x+paddle.width &&
        ball.x+ball.radius>paddle.x &&
        ball.y-ball.radius<paddle.y+paddle.height &&
        ball.y+ball.radius>paddle.y
    );

}

function resetBall(){

    ball.x=WIDTH/2;
    ball.y=HEIGHT/2;
    ball.speedX*=-1;

}

function endGame(winner){

    gameRunning=false;

    document.getElementById("winner").innerHTML=winner+" Wins!";
    document.getElementById("gameOver").classList.remove("hide");

}

function restartGame(){

    playerScore=0;
    aiScore=0;

    player.y=HEIGHT/2-50;
    ai.y=HEIGHT/2-50;

    resetBall();

    gameRunning=true;

    document.getElementById("gameOver").classList.add("hide");

    gameLoop();

}

function update(){

    if(!gameRunning) return;

    ball.x+=ball.speedX;
    ball.y+=ball.speedY;

    ai.y+=(ball.y-(ai.y+ai.height/2))*0.08;

    if(ball.y<0 || ball.y>HEIGHT)
        ball.speedY*=-1;

    let currentPlayer=(ball.x<WIDTH/2)?player:ai;

    if(collision(ball,currentPlayer))
        ball.speedX*=-1;

    if(ball.x<0){

        aiScore++;

        if(aiScore>=WIN_SCORE){
            endGame("Computer");
            return;
        }

        resetBall();

    }

    if(ball.x>WIDTH){

        playerScore++;

        if(playerScore>=WIN_SCORE){
            endGame("Player");
            return;
        }

        resetBall();

    }

}

function render(){

    drawRect(0,0,WIDTH,HEIGHT,"#1565C0");

    drawNet();

    drawRect(player.x,player.y,player.width,player.height,"white");
    drawRect(ai.x,ai.y,ai.width,ai.height,"white");

    drawCircle(ball.x,ball.y,ball.radius,"yellow");

    drawText(playerScore,WIDTH/4,50);
    drawText(aiScore,WIDTH*3/4,50);

}

function gameLoop(){

    if(!gameRunning) return;

    update();

    render();

    requestAnimationFrame(gameLoop);

}

gameLoop();
