var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   backGroundImg =loadImage("pro-C35 images/Hot Air Ballon-01.png");
   balloonImage1=loadAnimation("pro-C35 images/Hot Air Ballon-02.png");
   balloonImage2=loadAnimation("pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-04.png")
  }

function setup(){
  database=firebase.database();
  
  createCanvas(1500,700);

  balloon=createSprite(250,475,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  
}

function draw() {
  background(backGroundImg); 
  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.001;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.001;
  }

  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
