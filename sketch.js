var play=1;
var over=0;
var gamestate=play;

var trex,trexrun,trexCo;
var ground,groundI,ground2;
var cloud,cloudGrp ,cloudimage;

var obstacle1,ObsGrp,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score=0;

var gameover,goI,res,resI;
var jumpS,obsS,scoreS;

function preload(){
  
     trexrun=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundI=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  
   obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  goI=loadImage("gameOver.png");
  resI=loadImage("restart.png");
  
  trexCo=loadAnimation("trex_collided.png");
  
  jumpS=loadSound("jump.mp3");
  obsS=loadSound("die.mp3");
  scoreS=loadSound("checkPoint.mp3");
}



function setup(){
  
  createCanvas(600,200);
  
  trex=createSprite(50,150,10,10);
  trex.addAnimation("run",trexrun);
  trex.scale=0.5;
  
  ground= createSprite(600,160,10,10);
  ground.addImage("ground",groundI);
  
  
  ground2=createSprite(0,170,300,10);
  ground2.visible=false;
  
  cloudGrp=new Group();
  ObsGrp=new Group();
  
  trex.setCollider("circle",0,0,40);
  trex.debug=false;
  
  trex.addAnimation("Collide",trexCo);
    gameover=createSprite(300,100,10,10);
  res=createSprite(300,100,10,10);
    
  gameover.addImage(goI);
  gameover.scale=0.5;
    
  res.addImage(resI);
  res.scale=0.5;
  gameover.visible=false;
  res.visible=false;
}
function draw(){
  
   background("yellow"); 
 text("Score:"+score,500,20);
  
  if(gamestate===play){
     
   score=score+(Math.round(getFrameRate()/60));
     if(keyDown("space")&&trex.y>140){
     trex.velocityY=-40;
       jumpS.play();
  
  }
    ground.velocityX=-(20+score/500);
    
     trex.velocityY=trex.velocityY+6;
    
      if(ground.x<0){
  
  ground.x=ground.width/2;
  }
    
     if(score>0 && score%100===0){
     scoreS.play();
     }
    
     spawnclouds();
  spawnobstacles();
    
     if(trex.isTouching(ObsGrp)){
     gamestate=over; 
       obsS.play();
      // trex.velocityY=-9;
     }
   }
  
  else if(gamestate===over){
    
  ground.velocityX=0;
    
    cloudGrp.setVelocityXEach(0);
    ObsGrp.setVelocityXEach(0);
    
    cloudGrp.setLifetimeEach(-1);
    ObsGrp.setLifetimeEach(-1);
    
    trex.velocityY=0;
    
    trex.changeAnimation("Collide",trexCo);
    gameover.visible=true;
    res.visible=true;
    if(mousePressedOver(res))
    {
       reset();
    }
  }
  
  trex.collide(ground2);
  
  drawSprites();
}
function reset(){
  gamestate=play;
  cloudGrp.destroyEach();
    ObsGrp.destroyEach();
  
   gameover.visible=false;
  res.visible=false;
  trex.changeAnimation("run",trexrun);
  score=0;
  
}
function spawnclouds(){
  
if(frameCount % 65 === 0)
{
   cloud=createSprite(600,100,40,10);
cloud.addImage(cloudimage);
cloud.y = Math.round(random(10,100));
  
cloud.scale=0.5;
cloud.velocityX=-3;
cloud.lifetime=200;
  
cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  
cloudGrp.add(cloud);

} }

function spawnobstacles(){
  
  if(frameCount%40===0){
    
  var  obstacle=createSprite(600,150,10,10);
    obstacle.velocityX=-(20+score/500);
    var Obs=Math.round(random(1,6));
    
    switch(Obs){
      case 1:obstacle.addImage(obstacle1);
        break;
        case 2:obstacle.addImage(obstacle2);
        break;
     case 3:obstacle.addImage(obstacle3);
        break;
        case 4:obstacle.addImage(obstacle4);
        break;
     case 5:obstacle.addImage(obstacle5);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;
        default:break;
    }
    
    obstacle.scale=0.5;
    obstacle.lifetime=200;
    ObsGrp.add(obstacle);
  } }

