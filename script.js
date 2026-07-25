const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const leftScoreText = document.getElementById("leftScore");
const rightScoreText = document.getElementById("rightScore");

const paddleWidth = 15;
const paddleHeight = 100;

const ballSize = 14;

let leftScore = 0;
let rightScore = 0;

const leftPaddle = {
    x:20,
    y:200,
    dy:0
};

const rightPaddle = {
    x:canvas.width-35,
    y:200,
    dy:0
};

const ball = {
    x:canvas.width/2,
    y:canvas.height/2,
    dx:6,
    dy:4
};

function drawRect(x,y,w,h,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ballSize,0,Math.PI*2);
    ctx.fillStyle="white";
    ctx.fill();
}

function drawCenterLine(){

    for(let i=0;i<canvas.height;i+=30){

        drawRect(canvas.width/2-2,i,4,20,"gray");

    }

}

function update(){

    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    leftPaddle.y = Math.max(0,Math.min(canvas.height-paddleHeight,leftPaddle.y));
    rightPaddle.y = Math.max(0,Math.min(canvas.height-paddleHeight,rightPaddle.y));

    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.y-ballSize<0 || ball.y+ballSize>canvas.height){
        ball.dy *= -1;
    }

    if(
        ball.x-ballSize < leftPaddle.x+paddleWidth &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y+paddleHeight
    ){
        ball.dx *= -1;
        ball.x = leftPaddle.x+paddleWidth+ballSize;
    }

    if(
        ball.x+ballSize > rightPaddle.x &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y+paddleHeight
    ){
        ball.dx *= -1;
        ball.x = rightPaddle.x-ballSize;
    }

    if(ball.x<0){
        rightScore++;
        resetBall();
    }

    if(ball.x>canvas.width){
        leftScore++;
        resetBall();
    }

    leftScoreText.textContent = leftScore;
    rightScoreText.textContent = rightScore;

}

function resetBall(){

    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.dx = -ball.dx;

    ball.dy = (Math.random()*6)-3;

}

function draw(){

    // Blue table background
ctx.fillStyle = "#1976d2";
ctx.fillRect(0, 0, canvas.width, canvas.height);


    drawCenterLine();

    drawRect(leftPaddle.x,leftPaddle.y,paddleWidth,paddleHeight,"white");
    drawRect(rightPaddle.x,rightPaddle.y,paddleWidth,paddleHeight,"white");

    drawBall();

    ctx.beginPath();
ctx.arc(canvas.width/2, canvas.height/2, 60, 0, Math.PI * 2);
ctx.strokeStyle = "white";
ctx.lineWidth = 4;
ctx.stroke();


}

function gameLoop(){

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

document.addEventListener("keydown",e=>{

    switch(e.key){

        case "w":
        case "W":
            leftPaddle.dy=-8;
            break;

        case "s":
        case "S":
            leftPaddle.dy=8;
            break;

        case "ArrowUp":
            rightPaddle.dy=-8;
            break;

        case "ArrowDown":
            rightPaddle.dy=8;
            break;
    }

});

document.addEventListener("keyup",e=>{

    switch(e.key){

        case "w":
        case "W":
        case "s":
        case "S":
            leftPaddle.dy=0;
            break;

        case "ArrowUp":
        case "ArrowDown":
            rightPaddle.dy=0;
            break;

    }

});

gameLoop();
