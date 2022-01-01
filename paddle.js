export default class Paddle {
     constructor(game){
          this.gameWidth = game.gameWidth;
          this.width = 150;
          this.height = 20;
          this.speed = 0;
          this.maximumSpeed = 7;
          this.position = {
               x: game.gameWidth / 2 - this.width / 2,
               y: game.gameHeight - this.height - 10,
          };
     }
     moveLeft(){
          this.speed = -this.maximumSpeed;
     }
     moveRight(){
          this.speed = this.maximumSpeed;
     }
     stop(){
          this.speed = 0;
     }
     draw(zim){
          zim.fillStyle = '#0ff';
          zim.fillRect(this.position.x,this.position.y,this.width,this.height);
     }
     update(deltaTime){
          this.position.x += this.speed;
          if(this.position.x < 0){
               this.position.x = 0;
          }
          if(this.position.x + this.width > this.gameWidth){
               this.position.x = this.gameWidth - this.width;
          }
     }
}