
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var background1, backgroundImage;
var gameState = "play";

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("images (2).jpg");
 
}



function setup() {
  
  background1 = createSprite(250,150,500,300);
  background1.addImage(backgroundImage);
  background1.scale = 2.15;
  
  
  monkey = createSprite(80,275,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  monkey.velocityX = 2;
  
  ground = createSprite(400,275,900,10);
  ground.x = ground.width/2;
  console.log(ground.x);
  ground.visible = false;
  
  
 

  bananaGroup = new Group;
  stoneGroup = new Group;
  
}


function draw() {
  

  if(gameState==="play"){
  background("white");
  camera.position.x = monkey.x;
  
  if(keyDown("space")&&monkey.y > 200){
    monkey.velocityY = -15;
  }

  if (background1.x < camera.position.x - 50) {
    background1.x = camera.position.x;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if (ground.x < camera.position.x-10) {
    ground.x = camera.position.x;
  }
  
  if(background1.x < background1.width/2.10){
    background1.x = 250;
  }
  
  if(bananaGroup.isTouching(monkey)){
    score = score + 2;
    bananaGroup.destroyEach();
  }
  
  switch(score){
    case 10: monkey.scale = 0.125;
             break;
    case 20: monkey.scale = 0.15;
             break;
    case 30: monkey.scale = 0.175;
             break;
    case 40: monkey.scale = 0.2;
             break;
    default: break;
  }
  
  if(stoneGroup.isTouching(monkey)){
    gameState= "end";
  }
  
  spawnBananas();
  
  spawnObstacles();
  
  drawSprites();
  
  stroke("black");
  fill("black")
  textSize(20);
  text("Score:" + score, camera.position.x,30)
}
if(gameState==="end"){
  background("black")
  text("Game Ended", camera.position.x-20,180);
  text("Reload to play again", camera.position.x-50, 220);

}
}

function spawnBananas(){
  if(frameCount%80===0){
    banana = createSprite(monkey.x + 200, 120, 600, 500);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 1000;
    bananaGroup.add(banana);
  }
}


function spawnObstacles(){
  if(frameCount%300===0){
    stone = createSprite(monkey.x + 200, 250);
    stone.addImage( obstacleImage);
    stone.scale = 0.2;
    stone.lifetime = 1000;
    stoneGroup.add(stone);
  }
}

