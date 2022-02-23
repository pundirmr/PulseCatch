var bowl, bowlImage;
var cherry, orange, banana;
var packetList;

var greenPacket;
var yellowPacket;
var bombPacket;

var bombPackets = [];
var yellowPackets = [];
var greenPackets = [];

var backgroundImage;
var count =0;
var life=3;

var isDrawing = false;
var userSelectedPacket = "";
var platform ="";
//preload all the sprites

var bowlImageg1,bowlImageg2,bowlImageg3;
var bowlImagey1,bowlImagey2,bowlImagey3;
var isSafari;
function preload() {
  isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
  navigator.userAgent &&
  navigator.userAgent.indexOf('CriOS') == -1 &&
  navigator.userAgent.indexOf('FxiOS') == -1;


  backgroundImage = loadImage("GameBG.jpg");

  bowlImage = loadImage("robber.png");

  bowlImageg1 = loadImage("robber_g_1.png");
  bowlImageg2 = loadImage("robber_g_2.png");
  bowlImageg3 = loadImage("robber_g_3.png");

  bowlImagey1 = loadImage("robber_y_1.png");
  bowlImagey2 = loadImage("robber_y_2.png");
  bowlImagey3 = loadImage("robber_y_3.png");

  cherry = loadImage("bomb.png");
  orange = loadImage("coin.png");
  banana = loadImage("coin1.png");

  var params = location.href.split('?')[1].split('&');
  data = {};
  for (x in params)
  {
  data[params[x].split('=')[0]] = params[x].split('=')[1];
  }
  //console.log('received data is :' + data.packet);
  //console.log('received stage is :' + data.stage);

  userSelectedPacket = data.packet;

}
let bgc;
var initBowl = true;
function setup() {
  bgc = 100;
  if(isSafari){
    //ios
    createCanvas(screen.height - 20,screen.width - 20 );
  }else{
  //android
    createCanvas(screen.width - 20, screen.height - 20);
  }
  
  if(isSafari){
    //ios
    bowl = createSprite(screen.height - 70, screen.width - 80, 20,20);
  }else{
    //android//Create bowl sprite
    bowl = createSprite(200, screen.height - 70, 20, 20);
  }

  bowl.scale = 0.5;
  bowl.addImage(bowlImage);

  bowl.position.x = screen.width/2;

  packetList = [cherry,orange,banana];
  createRandom();

}

function mouseDragged(event) {
  bowl.position.x=event.touches[0].clientX;
}
var totalTime = 30;
var fallingSpeed = 2.5;
setInterval(function(){
  totalTime = totalTime - 1;
  //console.log('time left : ' + totalTime);

  if(totalTime < 25)
  {
    fallingSpeed = 3.0;
  }
  if(totalTime < 20)
  {
    fallingSpeed = 3.5;
  }
  if(totalTime < 15)
  {
    fallingSpeed = 4.5;
  }
  if(totalTime < 10)
  {
    fallingSpeed = 5.5;
  }

  if(userSelectedPacket == "green"){
    if(count==1){
      bowl.addImage(bowlImageg1);
    }
    if(count==2){
      bowl.addImage(bowlImageg2);
    }
    if(count==3){
      bowl.addImage(bowlImageg3);
    }
  }else{
    if(count==1){
      bowl.addImage(bowlImagey1);
    }
    if(count==2){
      bowl.addImage(bowlImagey2);
    }
    if(count==3){
      bowl.addImage(bowlImagey3);
    }
  }

}, 1000);

setInterval(function(){ 
  //code goes here that will be run every 2 seconds. 
  if(isDrawing){
    createRandom();
  }
  isDrawing = false;

}, 700);

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
    removeSprite(value);
  }
  return arr;
}

function draw() {
  isDrawing = true;
  //background(bgc);
  background(backgroundImage);
  //Generate random greenPacket sprite

  for (var i = 0; i < bombPackets.length; i++) {
    if(bombPackets[i]!=null){
      bombPackets[i].position.y = bombPackets[i].position.y + fallingSpeed;

      if (bombPackets[i].position.y > height +1000) 
      {
        bombPackets = removeItemOnce(bombPackets,bombPackets[i]);
        //removeSprite( bombPackets[i] );
      }
    }
  }

  for (var i = 0; i < greenPackets.length; i++) {
    if(greenPackets[i]!=null){
      greenPackets[i].position.y = greenPackets[i].position.y + fallingSpeed;

      if (greenPackets[i].position.y > height +1000) 
      {
        greenPackets = removeItemOnce(greenPackets,greenPackets[i]);
        //removeSprite( greenPackets[i] );
      }
    }
  }

  for (var i = 0; i < yellowPackets.length; i++) {
    if(yellowPackets[i]!=null){
      yellowPackets[i].position.y = yellowPackets[i].position.y + fallingSpeed;

      if (yellowPackets[i].position.y > height +1000) 
      {
        yellowPackets = removeItemOnce(yellowPackets,yellowPackets[i]);
        //removeSprite( yellowPackets[i]);
      }
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
  //bowl.position.x=mouseX;


  for (var i = 0; i < greenPackets.length; i++) {
    if(greenPackets[i]!=null){
      if (greenPackets[i].overlap(bowl))
      {
        count++;
        if(userSelectedPacket != "green"){
          life = 0;
        }
        greenPackets = removeItemOnce(greenPackets,greenPackets[i]);
        //removeSprite( greenPackets[i] );
      }
    }
  }

  for (var i = 0; i < yellowPackets.length; i++) {
    if(yellowPackets[i]!=null){
      if (yellowPackets[i].overlap(bowl))
      {
        count++;
        if(userSelectedPacket != "yellow"){
          life = 0;
        }
        yellowPackets = removeItemOnce(yellowPackets,yellowPackets[i]);
        //removeSprite( yellowPackets[i] );
      }
    }
  }

  for (var i = 0; i < bombPackets.length; i++) {
    if(bombPackets[i]!=null){
      if (bombPackets[i].overlap(bowl))
      {
        life = 0;

        bombPackets = removeItemOnce(bombPackets,bombPackets[i]);
      }
    }
  }

  //Display Score and Life
  fill("white");
  textSize(15);
  text("Score:" + count, 20,50);

  fill("white");
  textSize(15);
  text("Time:" + totalTime, 20,80);

  //text("LIFE:"+life,500,40);
  //Game Over condition
  if(totalTime <=0)
  {
    textSize(20);
    text("GAME OVER",50,300);
    noLoop();
    parent.window.postMessage("score:" + count , "*");
    parent.window.postMessage("removetheiframe", "*");
  }
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
  //count=0;
  //life=3;
  loop();
}
var lastpacket = 0;
function createRandom(){

  var newPacket;
  var n = (Math.floor(Math.random() * packetList.length));

  newPacket = createSprite(random(10,width-10),30,20,20);
  newPacket.scale = 0.35;

  if(n==0){
    newPacket.addImage(cherry);
    bombPackets.push(newPacket);
  }
  if(n==1){
    newPacket.addImage(orange);
    greenPackets.push(newPacket);
  }
  if(n==2){
    newPacket.addImage(banana);
    yellowPackets.push(newPacket);
  }
  
}
