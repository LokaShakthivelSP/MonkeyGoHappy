var monkey,monkeyAni,bananaImg,jungle,jungleImg,stoneImg,
    invisibleGround,bananaGroup,stoneGroup,score,a,gameState,PLAY,END;

function preload(){
  monkeyAni=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png",           "Monkey_06.png","Monkey_07.png","Monkey_08.png",
"Monkey_09.png","Monkey_10.png");
  
  bananaImg=loadImage("banana.png");
  jungleImg=loadImage("jungle.jpg");
  stoneImg=loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  jungle = createSprite(200,200,0,0);
  jungle.addImage("jungle",jungleImg);
  jungle.x=jungle.width/2;
  
  monkey = createSprite(60,340,0,0);
  monkey.addAnimation("monkey",monkeyAni);
  monkey.scale=0.1;
   
  invisibleGround=createSprite(200,380,400,1);
  invisibleGround.visible=false;
  
  bananaGroup=createGroup();
  stoneGroup=createGroup();

  score=0;
  PLAY=1;
  END=0;
  gameState=PLAY;
}

function draw() {
  background(220);
  
  if(gameState===PLAY){
    monkey.velocityY+=0.8;
    monkey.collide(invisibleGround);

    spawnBanana();
    spawnStone();
    
    jungle.velocityX=-2;
    if(jungle.x<0){
      jungle.x=jungle.width/2;
    }

    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score+=2;
    }

    switch(score){
      case 0:a=0;
              break;
      case 10:monkey.scale=0.12;
              a=1;
              break;
      case 20:monkey.scale=0.14;
              a=2;
              break;
      case 30:monkey.scale=0.16;
              a=3;
              break;
      case 40:monkey.scale=0.18;
              a=4;
              break;
      case 50:monkey.scale=0.2;
              a=5;
              break;
    }

    switch(a){
      case 0: if(keyDown("space")&&monkey.y>=348){
                monkey.velocityY-=17;
              }
              break;

      case 1: if(keyDown("space")&&monkey.y>=342){
                monkey.velocityY-=17;
              }
              break;

      case 2: if(keyDown("space")&&monkey.y>=336){
                monkey.velocityY-=17;
              }
              break;   
      case 3: if(keyDown("space")&&monkey.y>=330){
                monkey.velocityY-=17;
              }
              break;
      case 4: if(keyDown("space")&&monkey.y>=324){
                monkey.velocityY-=17;
              }
              break;
      case 5: if(keyDown("space")&&monkey.y>=318){
                monkey.velocityY-=17;
              }
              break;
    }

    if(monkey.isTouching(stoneGroup)){
      gameState=END;
    }
  }else if(gameState===END){
    monkey.destroy();
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    
    jungle.velocityX=0;
  }

  drawSprites();
  
  textSize(30);  
  textAlign(CENTER);
  fill("white");
  
  text("Score: "+score,200,50);
  
  if(gameState===END){
    text("GAME OVER!",200,200);
  }
}

function spawnBanana(){
  if(World.frameCount%80===0){
    banana=createSprite(400,random(120,200),0,0);
    banana.addAnimation("banana",bananaImg);
    banana.scale=0.05; 
    banana.velocityX=-8;
    banana.lifetime=55;
    bananaGroup.add(banana);
  }
}

function spawnStone(){
  if(World.frameCount%200===0){
    stone=createSprite(400,360,0,0);
    stone.addAnimation("stone",stoneImg);
    stone.scale=0.2;    
    stone.velocityX=-8;
    stone.lifetime=55;
    stoneGroup.add(stone);
  }
}