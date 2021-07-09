

var backgroundImg;
var bg1, bg2;
var gameState = 0;
var astronaut, deadAstronaut;
var alien1, alien2, alien3;
var aliensGroup, meteoriteGroup;
var meteorite1, meteorite2;
var traitor,evilAstronaut;
var laser, laserGroup;
var a1, a2, a3;
var AlienInvasion;
var life1, life2;
var score = 0;

function preload() {
  //load the images
  backgroundImg = loadImage("Pictures/Galaxy bg.jpg");
  bg1 = loadImage("Pictures/Galaxy 1.jpg");
  bg2 = loadImage("Pictures/Galaxy 2.jpg");
  bg3 = loadImage("Pictures/Aliens_invaded.jpg");
  astronautI = loadAnimation("Pictures/Astronaut.png");
  alien3 = loadImage("Pictures/Alien 1.png");
  alien4 = loadImage("Pictures/Alien 2.png");
  alien1 = loadImage("Pictures/Alien 3.png");
  meteorite = loadImage("Pictures/Meteorite.png");
  meteorite1 = loadImage("Pictures/Meteorite2.png");
  Deceiver = loadAnimation("Pictures/The_Deceiver.png");
  laserlight = loadImage("Pictures/laser.jpg");
  DAstronaut = loadAnimation("Pictures/deadAstronaut.png");
  AlienInvasion = loadImage("Pictures/AlienInvasion.jpg");
  lifeIcon = loadImage("Pictures/life.png");
  BadAstronaut = loadAnimation("Pictures/Bad_Astronaut2.jpg");
}

function setup() {
  createCanvas(1900, 900);

  introduction = new form();
  story = new story();
  astronaut = createSprite(1800, 500, 1, 1);
  deceiver = createSprite(400, 500, 1, 1);
  life1 = createSprite(100, 70, 1, 1);
  life2 = createSprite(130, 70, 1, 1);
  deceiver.velocityY = -6;
  a1 = createGroup();
  a2 = createGroup();
  a3 = createGroup();
  meteoriteGroup = createGroup();
  laserGroup = createGroup();
}

function draw() {

  // introductory page
  if (gameState === 0) {
    background(bg1)
    introduction.display()


    introduction.button1.mousePressed(() => {
      gameState = 1;
    })

    introduction.button2.mousePressed(() => {
      gameState = 2;
    })
  }

  //How to play?
  if (gameState === 2) {
    background(bg2)
    introduction.button1.hide();
    introduction.button2.hide();
    introduction.title.hide();
    introduction.greeting.hide();
    story.display();

    story.back.mousePressed(() => {
      gameState = 0;
      story.back.hide();
      story.help.hide();
      story.story.hide();
      story.storyLine.hide();
      introduction.button1.show();
      introduction.button2.show();
      introduction.title.show();

    })
  }
  // The Game
  if (gameState === 1) {
    background(backgroundImg);
    introduction.button1.hide();
    introduction.button2.hide();
    introduction.title.hide();
    introduction.greeting.hide();
    story.back.hide();

    life1.addImage("life", lifeIcon);
    life1.scale = 0.2;

    life2.addImage("life", lifeIcon);
    life2.scale = 0.2;

    astronaut.addAnimation("astronaut", astronautI);
    astronaut.addAnimation("deadAstronaut",DAstronaut);
    astronaut.scale = 0.5;

    deceiver.addAnimation("traitor", Deceiver);
    deceiver.addAnimation("evilAstronaut",BadAstronaut);
    deceiver.scale = 0.8;

    //movement of the astronaut
    astronaut.y = World.mouseY

    //edges
    edges = createEdgeSprites();
    astronaut.bounceOff(edges[0]);
    astronaut.bounceOff(edges[1]);
    astronaut.bounceOff(edges[2]);
    astronaut.bounceOff(edges[3]);

    deceiver.bounceOff(edges[0]);
    deceiver.bounceOff(edges[1]);
    deceiver.bounceOff(edges[2]);
    deceiver.bounceOff(edges[3]);

    //score
    textSize(30);
    fill("white")
    text("𝓢𝓒𝓞𝓡𝓔: " + score, 1600, 100)

    //if aliens are touching deceiver
    if (a1.isTouching(deceiver)) {
      a1.setVelocityXEach(80)
    }
    if (a2.isTouching(deceiver)) {
      a2.setVelocityXEach(80)
    }
    if (a3.isTouching(deceiver)) {
      a3.setVelocityXEach(80)
    }

    //if aliens are touched by lasers
    if (a1.isTouching(laserGroup)) {
      a1.destroyEach();
      score = score + 10;
    }
    if (a2.isTouching(laserGroup)) {
      a2.destroyEach();
      score = score + 20;
    }
    if (a3.isTouching(laserGroup)) {
      a3.destroyEach();
      score = score + 30;
    }



    spawnAliens();


    //creating laser
    if (keyDown("space")) {
      createlaser();
   
     
    }
    //calling for end state
    if (a1.isTouching(astronaut) || (a2.isTouching(astronaut)) || (a3.isTouching(astronaut))) {
      gameState = 3;
    }
  }

  //end State
  if (gameState === 3) {
    background(AlienInvasion);
    astronaut.changeAnimation("deadAstronaut",DAstronaut)
    a1.destroyEach();
    a1.setVelocityXEach(0);
    a2.destroyEach();
    a2.setVelocityXEach(0);
    a3.destroyEach();
    a3.setVelocityXEach(0);
    deceiver.visible = false;
    laserGroup.destroyEach(0);
    life2.destroy();
    textSize(40);
    fill("white");
    text("𝒴𝑜𝓊 𝓁𝑜𝓈𝓉!! 𝒯𝒽𝑒 𝒜𝓁𝒾𝑒𝓃𝓈 𝒶𝓇𝑒 𝒶𝓉𝓉𝒶𝒸𝓀𝒾𝓃𝑔 𝓎𝑜𝓊𝓇 𝓅𝓁𝒶𝓃𝑒𝓉!!",400,300);
    text("𝒴𝑜𝓊 𝒸𝒶𝓃𝓃𝑜𝓉 𝒻𝒶𝒾𝓁!! 𝒯𝒽𝒾𝓃𝓀 𝒶𝒷𝑜𝓊𝓉 𝓉𝒽𝑒 𝓁𝒾𝓋𝑒𝓈 𝒶𝓃𝒹 𝓉𝒽𝑒 𝓈𝓂𝒾𝓁𝑒𝓈 𝑜𝒻 𝓉𝒽𝑒 𝓅𝑒𝑜𝓅𝓁𝑒 𝓌𝒽𝑜 𝓇𝑒𝓁𝓎 𝑜𝓃 𝓎𝑜𝓊!!",40,400) 
    text("𝒫𝓇𝑒𝓈𝓈'𝐿' 𝒻𝑜𝓇 𝒶𝓃𝑜𝓉𝒽𝑒𝓇 𝒸𝒽𝒶𝓃𝒸𝑒.", 650, 500)
    if (keyCode === 108) {
      gameState = 4;
     

    }
  }
  //level2
  if(gameState === 4){
    background(backgroundImg); 

    
    life1.addImage("life", lifeIcon);
    life1.scale = 0.2;
    
    //changing animations
    astronaut.changeAnimation("astronaut", astronautI);
    
    deceiver.visible = true;
    deceiver.changeAnimation("evilAstronaut",BadAstronaut);
    

    //movement of the astronaut
    astronaut.y = World.mouseY

    //edges
    edges = createEdgeSprites();
    astronaut.bounceOff(edges[0]);
    astronaut.bounceOff(edges[1]);
    astronaut.bounceOff(edges[2]);
    astronaut.bounceOff(edges[3]);

    deceiver.bounceOff(edges[0]);
    deceiver.bounceOff(edges[1]);
    deceiver.bounceOff(edges[2]);
    deceiver.bounceOff(edges[3]);

    //score
    textSize(30);
    fill("white")
    text("𝓢𝓒𝓞𝓡𝓔: " + score, 1600, 100)

    //if aliens are touching deceiver
    if (a1.isTouching(deceiver)) {
      a1.setVelocityXEach(80)
    }
    if (a2.isTouching(deceiver)) {
      a2.setVelocityXEach(80)
    }
    if (a3.isTouching(deceiver)) {
      a3.setVelocityXEach(80)
    }

    //if aliens are touched by lasers
    if (a1.isTouching(laserGroup)) {
      a1.destroyEach();
      score = score + 10;
    }
    if (a2.isTouching(laserGroup)) {
      a2.destroyEach();
      score = score + 20;
    }
    if (a3.isTouching(laserGroup)) {
      a3.destroyEach();
      score = score + 30;
    }
  
    spawnAliens();


    //creating laser
    if (keyDown("space")) {
      createlaser();
   
     
    }
    //calling for end state
    if (a1.isTouching(astronaut) || (a2.isTouching(astronaut)) || (a3.isTouching(astronaut))) {
      gameState = 5;
    }
  }
   //final end state
  if(gameState === 5){
    background(bg3);
    astronaut.changeAnimation("deadAstronaut",DAstronaut)
    a1.destroyEach();
    a1.setVelocityXEach(0);
    a2.destroyEach();
    a2.setVelocityXEach(0);
    a3.destroyEach();
    a3.setVelocityXEach(0);
    deceiver.visible = false;
    laserGroup.destroyEach(0);
    life1.destroy();
    textSize(50);
    fill("white");
    text("𝒮𝒪𝑅𝑅𝒴, 𝒴𝒪𝒰 𝐿𝒪𝒮𝒯!!", 700,500);
    
  }
  

  drawSprites();
}

function spawnAliens() {
  var select_alien = Math.round(random(1, 3));

  if (World.frameCount % 50 == 0) {
    if (select_alien == 1) {
      al1();
    } else if (select_alien == 2) {
      al2();
    } else if (select_alien == 3) {
      al3();
    }
  }
}

function al1() {
  var alien1 = createSprite(0, Math.round(random(100, 850)), 0, 10, 10);
  alien1.addImage(alien3);
  alien1.velocityX = 30;
  alien1.lifetime = 500;
  alien1.scale = 0.4;

  a1.add(alien1);

}
function al2() {
  var alien2 = createSprite(0, Math.round(random(100, 850)), 0, 10, 10);
  alien2.addImage(alien4);
  alien2.velocityX = 30;
  alien2.lifetime = 500;
  alien2.scale = 0.8;

  a2.add(alien2);

}
function al3() {
  var alien3 = createSprite(0, Math.round(random(100, 850)), 10, 10);
  alien3.addImage(alien1);
  alien3.velocityX = 30;
  alien3.lifetime = 500;
  alien3.scale = 0.4;


  a3.add(alien3);

}

function createlaser() {
  var laser = createSprite(100, 100, 60, 10);
  laser.addImage(laserlight);
  laser.x = (astronaut.x - 60);
  laser.y = (astronaut.y - 70);
  laser.velocityX = -20;
  laser.lifetime = 20;
  laser.scale = 0.2;
  laserGroup.add(laser);
  return laser
}
