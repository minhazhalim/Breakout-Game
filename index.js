import Game from './game.js';
const gameScreen = document.getElementById('gameScreen');
const zim = gameScreen.getContext('2d');
const game_width = 800;
const game_height = 600;
let game = new Game(game_width,game_height);
let lastTime = 0;
function gameLoop(timestamp){
     let deltaTime = timestamp - lastTime;
     lastTime = timestamp;
     zim.clearRect(0,0,game_width,game_height);
     game.update(deltaTime);
     game.draw(zim);
     requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);