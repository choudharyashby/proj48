var bg,bgImg;
var soldier;
var bomb, bombImg;
var bomb1, bomb1Img
var medikit, medikitImg
var bullet;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;


var bombGroup;
var bomb1Group;
var medikitGroup;
var bulletGroup;

var score = 0;
var life = 3;


var heart1, heart2, heart3

var gameState = "fight"

var lose, winning, explosionSound;


function preload(){
  
  heart1Img = loadImage("heart_1.png")
  heart2Img = loadImage("heart_2.png")
  heart3Img = loadImage("heart_3.png")


  bombImg = loadImage("bomb.png");
  bomb1Img = loadImage("bomb1.png");
  medikitImg = loadImage("medikit.png");
  bulletImg = loadImage("bullet.png");

  soldierImg = loadImage("soldier.png");


  bgImg = loadImage("forest.jpg");

  lose = loadSound("lose.mp3");

  //winning = loadSound("win.mp3");
  //explosionSound = loadSound("explosion.mp3");

  //resetImg = loadImage("reset.png");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
 bg.addImage(bgImg)
 bg.scale = 1.1
  

//creating the player sprite
soldier = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 soldier.addImage(soldierImg)
  soldier.scale = 0.3
  soldier.debug = true
  soldier.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4;

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

    //restart = createSprite(540,500,50,50);
    //restart.addImage(resetImg);
    //restart.visible = false;
    //restart.scale = 0.25;
     
    
    
    
  
    bombGroup = new Group();
    bomb1Group = new Group();
    medikitGroup = new Group();
    bulletGroup = new Group();


}

function draw() {
  background(0); 


if(gameState === "fight"){

  //displaying the appropriate image according to lives reamining
  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }
    
  

  

  //go to gameState "lost" when 0 lives are remaining
  if(life===0){
    gameState = "lost"
  


    
  }


  //go to gameState "won" if score is 100
  if(score==50){
    gameState = "won"
  }

  
  if(keyDown("left_arrow")){
     soldier.velocityX = -3;
    
  }
  if(keyDown("right_arrow")){
    soldier.velocityX = 3;
  }


  if(keyDown("space")){
    ammo();
 }


if(soldier.isTouching(medikitGroup)){
  
  for(var i=0;i<medikitGroup.length;i++){  
    
    if(medikitGroup[i].isTouching(soldier)){
      medikitGroup[i].destroy()
      life = life+1

}
  
}
}

//reduce life and destroy zombie when player touches it
if(bombGroup.isTouching(soldier)){

  lose.play();

 for(var i=0;i<bombGroup.length;i++){     
      
  if(bombGroup[i].isTouching(soldier)){
    bombGroup[i].destroy()

      life=life-1
       } 
 
 }
}

if(soldier.isTouching(bomb1Group)){


  lose.play();

  for(var i=0;i<bomb1Group.length;i++){ 

    if(bomb1Group[i].isTouching(soldier)){
       bomb1Group[i].destroy()
      
       life = life-1

 }
  }


}

if(bulletGroup.isTouching(bomb1Group)){
     
   score = score +2
    bulletGroup.destroyEach();
     bomb1Group.destroyEach();



}

if(bulletGroup.isTouching(bombGroup)){

   score = score+1
  bulletGroup.destroyEach();
  bombGroup.destroyEach();
   
}

//calling the function to spawn zombies
enemy();
enemy1();
food();
}




drawSprites();

//displaying the score and remaining lives and bullets
textSize(20)
  fill("white")
//text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  bomb1Group.destroyEach();
  bombGroup.destroyEach();
  player.destroy();
  

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400);

}

}
function enemy(){
  if(frameCount%50===0){

  
  bomb = createSprite(1000,450,50,50)
  bomb.addImage(bombImg)
    bomb.scale = 0.15
    bomb.velocityX = -3
    bomb.debug= true
    bomb.setCollider("rectangle",0,0,400,400)
   
    bombGroup.lifetime = 400
   bombGroup.add(bomb)
  }

}

function enemy1(){
 if(frameCount%60===0){
    bomb1 = createSprite(1000,450,50,50);

    bomb1.addImage(bomb1Img);
    bomb1.scale = 0.15;
    bomb1.velocityX = -4
    bomb1.debug = true

    bomb1Group.lifetime = 200;
    bomb1Group.add(bomb1)

 }
  }

function food () {
  if(frameCount%70===0){
    medikit = createSprite(1000,450,50,50);

    medikit.addImage(medikitImg);
    medikit.scale = 0.15;
    medikit.velocityX = -4
    medikit.debug = true

    medikitGroup.lifetime = 200;
    medikitGroup.add(medikit);

}
}

function ammo () {
 bullet = createSprite(260,440,50,50);
 bullet.addImage(bulletImg);
 bullet.x= soldier.x;
 bullet.scale = 0.10;
 bullet.velocityX=4
 
 //bullet.debug = true

 bulletGroup.add(bullet);

}