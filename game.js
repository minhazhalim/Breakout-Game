import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js';
import {buildLevel,level1,level2} from './levels.js';
const gameState = {
     paused: 0,
     running: 1,
     menu: 2,
     gameOver: 3,
     newLevel: 4,
};
export default class Game {
     constructor(gameWidth,gameHeight,bricksPerRow){
          this.gameWidth = gameWidth;
          this.gameHeight = gameHeight;
          this.gamestate = gameState.menu;
          this.ball = new Ball(this);
          this.paddle = new Paddle(this);
          this.gameObjects = [];
          this.bricks = [];
          this.lives = 3;
          this.levels = [level1,level2];
          this.currentLevel = 0;
          new InputHandler(this.paddle,this);
     }
     start(){
          if(this.gamestate !== gameState.menu && this.gamestate !== gameState.newLevel) return;
          this.bricks = buildLevel(this,this.levels[this.currentLevel]);
          this.ball.reset();
          this.gameObjects = [this.ball,this.paddle];
          this.gamestate = gameState.running;
     }
     update(deltaTime){
          if(this.lives === 0){
               this.gamestate = gameState.gameOver;
          }
          if(this.gamestate === gameState.paused || this.gamestate === gameState.menu || this.gamestate === gameState.gameOver) return;
          if(this.bricks.length === 0){
               this.currentLevel++;
               this.gamestate = gameState.newLevel;
               this.start();
          }
          [...this.gameObjects,...this.bricks].forEach(object => {
               object.update(deltaTime);
          });
          this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
     }
     draw(zim){
          [...this.gameObjects,...this.bricks].forEach(object => object.draw(zim));
          if(this.gamestate === gameState.paused){
               zim.rect(0,0,this.gameWidth,this.gameHeight);
               zim.fillStyle = 'rgba(0,0,0,0.5)';
               zim.fill();
               zim.font = '30px Arial';
               zim.fillStyle = 'white';
               zim.textAlign = 'center';
               zim.fillText('Paused',this.gameWidth / 2,this.gameHeight / 2);
          }
          if(this.gamestate === gameState.menu){
               zim.rect(0,0,this.gameWidth,this.gameHeight);
               zim.fillStyle = 'rgba(0,0,0,1)';
               zim.fill();
               zim.font = '30px Arial';
               zim.fillStyle = 'white';
               zim.textAlign = 'center';
               zim.fillText('Press SpaceBar to Start the Game',this.gameWidth / 2,this.gameHeight / 2);
          }
          if(this.gamestate === gameState.gameOver){
               zim.rect(0,0,this.gameWidth,this.gameHeight);
               zim.fillStyle = 'rgba(0,0,0,1)';
               zim.fill();
               zim.font = '30px Arial';
               zim.fillStyle = 'white';
               zim.textAlign = 'center';
               zim.fillText('Game Over',this.gameWidth / 2,this.gameHeight / 2);
          }
     }
     togglePause(){
          if(this.gamestate == gameState.paused){
               this.gameState = gameState.running;
          }else{
               this.gameState = gameState.paused;
          }
     }
}