var astronaut , alien , metal, glass, fuel;
var laser , booster, moonImg , astroImg;
var alienGroup, lives, gameState;
var bullet,bulletGroup;

function preload(){
 gameState = 1
 lives = 5
 moonImg = loadImage("Images/Moon.jpg")
 astroImg = loadImage("Images/Astronaut.png")
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    astronaut = createSprite(200,120,10,10)
    astronaut.addImage(astroImg,"astro")
    astronaut.setCollider("rectangle",-30,40,150,300);
    astronaut.debug = true;
    astronaut.scale = 0.2
    alienGroup = new Group()
    bulletGroup = new Group();
}

function draw(){
    background(moonImg)
    if(gameState == 1 && (lives>0)){
       // isTouch = 0;
        move()
        spawnAliens()
        spawnResources()
        if(isTouchingAliens() && lives == 0){
            gameState = 0;
        }
    }
    drawSprites()
}

function move(){

    if(keyIsDown(UP_ARROW)){
        astronaut.y -= 5
    }
    if(keyIsDown(DOWN_ARROW)){
        astronaut.y += 5
    }
    if(keyIsDown(RIGHT_ARROW)){
        astronaut.x += 5
    }
    if(keyIsDown(LEFT_ARROW)){
        astronaut.x -= 5
    }
    if(keyDown("D")&&(frameCount%20 == 0)){
        bullet = createSprite(astronaut.x,astronaut.y,10,30);
        bullet.velocityX = 10
        bulletGroup.add(bullet);
    }
    if(keyDown("A")&&(frameCount%20 == 0)){
        bullet = createSprite(astronaut.x,astronaut.y,10,30);
        bullet.velocityX = -10
        bulletGroup.add(bullet);
    }
    if(keyDown("W")&&(frameCount%20 == 0)){
        bullet = createSprite(astronaut.x,astronaut.y,10,30);
        bullet.velocityY = -10
        bulletGroup.add(bullet);
    }
    if(keyDown("S")&&(frameCount%20 == 0)){
        bullet = createSprite(astronaut.x,astronaut.y,10,30);
        bullet.velocityY = 10
        bulletGroup.add(bullet);
    }
   

}



function spawnAliens(){
    var alien = createSprite(Math.round(random(0,800)),Math.round(random(0,400)),20,20)
    alien.visible = false
    if(frameCount % 40 == 0){
        alien.visible = true
        alien.shapeColor = "green"
        alien.debug = true;        
        alienGroup.add(alien)
        alien.velocityX = Math.random(20,30)
        alien.velocityY = Math.random(8,20)
    }
    if(bulletGroup.isTouching(alienGroup)){
        alien.lifetime = 0;
    }
}

function spawnResources(){
    if(frameCount % 200 == 0){
        var resource = createSprite(Math.round(random(0,800)),Math.round(random(0,400)),20,20)
        resource.shapeColor = "orange"
        resource.lifetime = 300
    }
}
function isTouchingAliens(){
    if(alienGroup.isTouching(astronaut)){
       lives -= 1
       alert(lives + " lives left! Be careful!")
       alienGroup.destroyEach(); 
       astronaut.x = 200
       astronaut.y = 200
    }
}

