var PLAY=1;
var END=0;
var gameState = PLAY;


var score=0;

var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4

function preload () {
  walkingBob=loadAnimation("assets/w1.png","assets/w2.png","assets/w3.png","assets/w4.png","assets/w5.png","assets/w6.png","assets/w7.png","assets/w8.png","assets/w9.png","assets/w10.png","assets/w11.png","assets/w12.png","assets/w13.png","assets/w14.png",
  "assets/w15.png","assets/w16.png","assets/w17.png","assets/w18.png");
  groundImage=loadImage("assets/ground2.png");
      obstacle1 = loadImage("assets/1st level pirate.gif");
    obstacle2 = loadImage("assets/captain jack sparrow.gif");
     obstacle3 = loadImage("assets/boxing cat.gif");
  obstacle4 = loadImage("assets/kevin hart spongebob.gif");
  gameoverimg = loadImage("assets/game over.jpg");
  sadSpongebob = loadAnimation("assets/sad spongebob2.png");
  restartimg = loadImage("assets/restart button.jpg");
 jumpsound = loadSound("assets/jumpsound.mp3");
  gameOverSound = loadSound("assets/game over.mp3");


}



function setup() {
  createCanvas(800,400);
 wb=createSprite(71,297);
 wb.addAnimation("wb",walkingBob);
 wb.addAnimation("sad", sadSpongebob);
 wb.scale = 0.5;
 
 ground = createSprite(187,375,800,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
 
  gameover = createSprite(380,222);
  gameover.addImage(gameoverimg)
  gameover.scale = 0.5
  gameover.visible = false;

  


  restart = createSprite(376,329);
  restart.addImage(restartimg);
  restart.scale = 0.2
  restart.visible = false;
ground.velocityX = -6;







obstaclesGroup= new Group();



//wb.debug=true
wb.setCollider("rectangle",0,0,150,100)



}


function draw() {
  background("black"); 

  text("Score: "+ score, 500,50);

  

  
  //text(mouseX+","+mouseY,mouseX,mouseY)
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

   

    wb.changeAnimation("wb", walkingBob);
   wb.scale = 0.5

   

    if(keyDown("space") && wb.y>=260) {
      wb.velocityY = -12
      jumpsound.play()
    }

    
  
    wb.velocityY = wb.velocityY + 1

  
  
    
  
    if(ground.x < 0){
      ground.x = ground.width/2;
    }

  wb.collide(ground)
   spawnObstacles();

   
   if(obstaclesGroup.isTouching(wb)){
      gameState = END;
      gameOverSound.play()
   }

   
   
  

  }

  else if(gameState===END){
    ground.velocityX = 0;
    wb.velocityX = 0;
    wb.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

    

    wb.changeAnimation("sad", sadSpongebob)
    wb.scale= 0.07


    gameover.addImage(gameoverimg)
    gameover.visible=true;

    restart.visible=true

    if(mousePressedOver(restart)) {
      reset();
    }
   

  }
  drawSprites();
}


  function reset(){
    gameState = PLAY
    gameover.visible = false;
    restart.visible = false;

    

    obstaclesGroup.destroyEach();
    score = 0;

  
  }









function spawnObstacles(){
  if(frameCount % 100 === 0){
    var obstacle = createSprite(745,338,10,10);

    obstacle.scale=.5

    obstacle.velocityX = -(6 + 3*score/100);

    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;

      case 3: obstacle.addImage(obstacle3);
              break;

      case 4: obstacle.addImage(obstacle4);
      break;


      

     
    }

    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);


  }
}