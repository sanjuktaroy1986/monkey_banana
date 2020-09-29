//declare all variables
var monkey , monkey_running,ground1
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score=0; var time=0; 
gameState="play";

function preload(){
  //load all images and animations
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400);
  
  //monkey sprite
  monkey=createSprite(100,370,30,30);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale=0.13;
  
  //ground
  ground=createSprite(600,390,1200,10);
  ground.shapeColor="green";
  ground.velocityX=-3;

  //create groups
 foodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  background("lightblue");
  
  fill("black");
  textSize(18);
  text("Survival Time: "+time,100,50);
  text("Score: "+score,400,50);
  
  //gamestate=play
  if( gameState==="play")
  {
  
    //update survival time
  time=Math.round(frameCount/10);
  
    //make monkey jump
   if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    
    //give gravity to monkey
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //reset ground
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
    
  spawnBanana();
  spawnObstacle();
    
    //check if money touches banana and increase score
    for(var i=0; i<foodGroup.length;i++){
      
      if(foodGroup.get(i).isTouching(monkey))
      {
        foodGroup.get(i).remove();
        score=score+1;
      }
    }
  
    //end game if monkey touches obstacle
  if(monkey.isTouching(obstacleGroup)){
    gameState="end";
  }
  }
  
  //gamestate=end
  if(gameState==="end")
  {
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  //make monkey collide with ground
  monkey.collide(ground);
  
  
  drawSprites();

  
}

//function to create bananas
function spawnBanana(){
if(frameCount%80===0){
  var banana=createSprite(500,Math.round(random(50,200)),30,30);
  banana.addImage(bananaImage);
  banana.velocityX=-5;
  banana.scale=0.08;
  banana.lifetime=200;
  monkey.depth=banana.depth+1;
  foodGroup.add(banana);
}
 
}

//function to create obstacles
function spawnObstacle(){
if(frameCount%200===0){
  var obstacle=createSprite(500,350,30,30);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=-5;
  obstacle.scale=0.2;
  obstacle.lifetime=200;
  //monkey.depth=banana.depth+1;
  obstacleGroup.add(obstacle);
  
}
 
}




