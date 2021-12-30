const rules = document.getElementById('rules');
const rulesButton = document.getElementById('rules-button');
const closeButton = document.getElementById('close-button');
const canvas = document.getElementById('canvas');
const zim = canvas.getContext('2d');
const brickRowCount = 9;
const brickColumnCount = 5;
const delay = 500;
let score = 0;
const ball = {
     x: canvas.width / 2,
     y: canvas.height / 2,
     size: 10,
     speed: 4,
     dx: 4,
     dy: -4,
     visible: true,
};
const paddle = {
     x: canvas.width / 2 - 40,
     y: canvas.height - 20,
     width: 80,
     height: 10,
     speed: 8,
     dx: 0,
     visible: true,
};
const brickInfo = {
     width: 70,
     height: 20,
     padding: 10,
     offsetX: 45,
     offsetY: 60,
     visible: true,
};
const bricks = [];
for(let i = 0;i < brickRowCount;i++){
     bricks[i] = [];
     for(let j = 0;j < brickColumnCount;j++){
          const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
          const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
          bricks[i][j] = {x,y,...brickInfo};
     }
}
function drawBall(){
     zim.beginPath();
     zim.arc(ball.x,ball.y,ball.size,0,Math.PI * 2);
     zim.fillStyle = ball.visible ? '#0095dd' : 'transparent';
     zim.fill();
     zim.closePath();
}
function drawPaddle(){
     zim.beginPath();
     zim.rect(paddle.x,paddle.y,paddle.width,paddle.height);
     zim.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
     zim.fill();
     zim.closePath();
}
function drawScore(){
     zim.font = '20px Arial';
     zim.fillText(`Score: ${score}`,canvas.width - 100,30);
}
function drawBricks(){
     bricks.forEach(column => {
          column.forEach(brick => {
               zim.beginPath();
               zim.rect(brick.x,brick.y,brick.width,brick.height);
               zim.fillStyle = brick.visible ? '#0095dd' : 'transparent';
               zim.fill();
               zim.closePath();
          });
     });
}
function movePaddle(){
     paddle.x += paddle.dx;
     if(paddle.x + paddle.width > canvas.width){
          paddle.x = canvas.width - paddle.width;
     }
     if(paddle.x < 0){
          paddle.x = 0;
     }
}
function moveBall(){
     ball.x += ball.dx;
     ball.y += ball.dy;
     if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
          ball.dx *= -1;
     }
     if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
          ball.dy *= -1;
     }
     if(ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.width && ball.y + ball.size > paddle.y){
          ball.dy = -ball.speed;
     }
     bricks.forEach(column => {
          column.forEach(brick => {
               if(brick.visible){
                    if(ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.width && ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.height){
                         ball.dy *= -1;
                         brick.visible = false;
                         increaseScore();
                    }
               }
          });
     });
     if(ball.y + ball.size > canvas.height){
          showAllBricks();
          score = 0;
     }
}
function increaseScore(){
     score++;
     if(score % (brickRowCount * brickColumnCount) === 0){
          ball.visible = false;
          paddle.visible = false;
          setTimeout(function(){
               showAllBricks();
               score = 0;
               paddle.x = canvas.width / 2 - 40;
               paddle.y = canvas.height - 20;
               ball.x = canvas.width / 2;
               ball.y = canvas.height / 2;
               ball.visible = true;
               paddle.visible = true;
          },delay);
     }
}
function showAllBricks(){
     bricks.forEach(column => {
          column.forEach(brick => (brick.visible = true));
     });
}
function draw(){
     zim.clearRect(0,0,canvas.width,canvas.height);
     drawBall();
     drawPaddle();
     drawScore();
     drawBricks();
}
function update(){
     movePaddle();
     moveBall();
     draw();
     requestAnimationFrame(update);
}
update();
function keyUp(event){
     if(event.key === 'Right' || event.key === 'ArrowRight' || event.key === 'Left' || event.key === 'ArrowLeft'){
          paddle.dx = 0;
     }
}
function keyDown(event){
     if(event.key === 'Right' || event.key === 'ArrowRight'){
          paddle.dx = paddle.speed;
     }else if(event.key === 'Left' || event.key === 'ArrowLeft'){
          paddle.dx = -paddle.speed;
     }
}
document.addEventListener('keyup',keyUp);
document.addEventListener('keydown',keyDown);
rulesButton.addEventListener('click',() => {
     rules.classList.add('show');
});
closeButton.addEventListener('click',() => {
     rules.classList.remove('show');
});