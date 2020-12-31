var END=0;
var PLAY=1;
var gameState=PLAY;
var monkey,monkeyImage;
var ground;
var bananas,bananaImage,bananasGroup;
var obstacles,obstaclesImage,obstaclesGroup;
var survivalTime=0;   
var bananasCollected=0;
var jungle,jungleImage;
function preload(){
  monkeyImage=loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png", "monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
 bananaImage= loadImage("banana.png");
  obstaclesImage=loadImage("obstacle.png");
jungleImage=loadImage("jungle.jpg")
}



function setup() {
  createCanvas(600,400)
  jungle= createSprite(100,100);
  jungle.addImage(jungleImage);
  jungle.velocityX=-5;
  jungle.scale=1.5;
  monkey= createSprite(60,350,20,20)
  monkey.addAnimation("running",monkeyImage)
  monkey.scale=0.15;
  
  ground= createSprite(0,400,100000,20)
  
  obstaclesGroup= new Group();
  bananasGroup= new Group();
}

function draw(){
  
 if(gameState===PLAY){
   survivalTime=Math.ceil(frameCount/frameRate())
  if(keyDown("space")&& monkey.y>=250){
   monkey.velocityY=-12;
 }
  if(jungle.x<0){
   jungle.x=600;
 }
  if(monkey.isTouching(bananasGroup)){
    bananasCollected++;
    bananasGroup.destroyEach()
  }
   banana();
  rock();
   monkey.velocityY+=0.5;
   
   if(monkey.isTouching(obstaclesGroup)){
     gameState=END;
   }
 }else if(gameState===END){
   obstaclesGroup.setVelocityXEach(0);
   bananasGroup.setVelocityXEach(0);
   jungle.velocityX=0;
   monkey.velocityY=0;
 }
  
  
 
  monkey.collide(ground);
  drawSprites();
  textSize(20);
  stroke("red");
 fill("red");
  text("Survival Time: "+ survivalTime,400,50);
   textSize(20);
  stroke("green");
 fill("green");
  text("Bananas Collected: "+ bananasCollected,100,50);
}
function banana(){
 if(frameCount%109==0){
  bananas= createSprite(600,random(20,170),20,20)
  bananas.velocityX=-5;
   bananas.addImage(bananaImage)
   bananas.scale=0.13;
   bananasGroup.add(bananas);
   bananas.setCollider("rectangle",0,0,600,200)
}
}
function rock(){
  if(frameCount%110===0){
    obstacles=createSprite(600,350,20,20)
    obstacles.velocityX=-10;
    obstacles.addImage(obstaclesImage)
    obstacles.scale=0.4;
    obstaclesGroup.add(obstacles);
    obstacles.setCollider("circle",0,0,200);
  }
}