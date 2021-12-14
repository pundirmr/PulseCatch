var bowl, bowlImage;
var cherry, orange, banana;
var packetList;

var greenPacket;
var yellowPacket;
var bombPacket;

var backgroundImage;
var count =0;
var life=3;

var isDrawing = false;
var userSelectedPacket = "";
//preload all the sprites
function preload() {
  bowlImage = loadImage("robber.png");

  cherry = loadImage("bomb.png");
  orange = loadImage("coin.png");
  banana = loadImage("coin1.png");
  backgroundImage = loadImage("bg.jpg");

  var params = location.href.split('?')[1].split('&');
  data = {};
  for (x in params)
  {
  data[params[x].split('=')[0]] = params[x].split('=')[1];
  }
  console.log('received data is :' + data.packet);
  userSelectedPacket = data.packet;
}
function setup() {
  createCanvas(screen.width - 20, screen.height - 20 );
  //Create bowl sprite
  bowl = createSprite(200, screen.height - 70, 20, 20);
  bowl.scale = 0.65;
  bowl.addImage(bowlImage);

  packetList = [cherry,orange,banana];
  createRandom();

}

function mouseDragged(event) {
  //console.log(event.touches[0].clientX);
  bowl.position.x=event.touches[0].clientX;
}
setInterval(function(){ 
  //code goes here that will be run every 5 seconds. 
  if(isDrawing){
    createRandom();
  }
  isDrawing = false;

}, 2000);
function draw() {
  isDrawing = true;
  background(backgroundImage);
  //Generate random greenPacket sprite

  if(greenPacket!=null){
    greenPacket.position.y = greenPacket.position.y + 3.5;

    if (greenPacket.position.y > height) 
    {
      removeSprite( greenPacket );
    }
  }
  if(yellowPacket!=null){
    yellowPacket.position.y = yellowPacket.position.y + 3.5;

    if (yellowPacket.position.y > height) 
    {
      removeSprite( yellowPacket );
    }
  }
  if(bombPacket!=null){
    bombPacket.position.y = bombPacket.position.y + 3.5;

    if(bombPacket.position.y>height)
    {
      removeSprite( bombPacket );
    }
  }
  
  //Move the bowl to the right and left
  if (keyDown(RIGHT_ARROW) && bowl.position.x < (width - 50))
    {
      bowl.position.x += 20;
    }
  if (keyDown(LEFT_ARROW) && bowl.position.x > 50)
    {
      bowl.position.x -= 20;
    }


  /* Moving the bowl using mouseX
  bowl.position.x=mouseX; */
  bowl.position.x=mouseX;

  if(greenPacket!=null){

  //Catch greenPacket in the bowl
  if (greenPacket.overlap(bowl)) 
    {
      count++; 
      removeSprite( greenPacket );
      console.log('greenpacket');
      if(userSelectedPacket != "green"){
        life = 0;
      }
    }
  }

  if(yellowPacket!=null){
  //Catch yellowPacket in the bowl
  if (yellowPacket.overlap(bowl)) 
    {
      count++; 
      removeSprite( yellowPacket );
      
      console.log('yellowPacket');
      if(userSelectedPacket != "yellow"){
        life = 0;
      }
    }
  }

  if(bombPacket!=null){
  //Catch bomb in the bowl
  if (bombPacket.overlap(bowl)) 
    {
      count++; 
      removeSprite( bombPacket );
      life = 0;
      console.log('bombPacket');

    }
  }
  //Display Score and Life
  fill("white");
  textSize(15);
  text("Score:" + count, 20,50);
  //text("LIFE:"+life,500,40);
  //Game Over condition
  if(life<=0)
    {
      textSize(20);
      text("GAME OVER",50,300);
      noLoop();
      parent.window.postMessage("score:" + count , "*");
      parent.window.postMessage("removetheiframe", "*");
    }
    drawSprites();
}
//Reset and restart the game
function mousePressed() 
{
  count=0;
  life=3;
  loop();
}
var lastpacket = 0;
function createRandom(){
  var n = (Math.floor(Math.random() * packetList.length));

  if(n==0){
    if(lastpacket == 0){createRandom(); return;}
    bombPacket = createSprite(random(10, width-10),30,20,20);
    bombPacket.scale = 0.65;
    bombPacket.addImage(cherry);
    lastpacket = 0;
  }
  if(n==1){
    if(lastpacket == 1){createRandom(); return;}
    greenPacket = createSprite(random(10, width-10),30,20,20);
    greenPacket.scale = 0.65;
    greenPacket.addImage(orange);
    lastpacket = 1;
  }
  if(n==2){
    if(lastpacket == 2){createRandom(); return;}
    yellowPacket = createSprite(random(10, width-10),30,20,20);
    yellowPacket.scale = 0.65;
    yellowPacket.addImage(banana);
    lastpacket = 2;
  }

}
