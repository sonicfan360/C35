var ball;
var dataBase, ballReference;
function setup(){
    createCanvas(500,500);
    dataBase = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ballReference = dataBase.ref("Ball/Position");
    ballReference.on("value", readPosition, showError)
    
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
    dataBase.ref("Ball/Position").set({x:ball.x, y:ball.y})
}
function readPosition(data){
    var position = data.val();

    
    ball.x = position.x
    ball.y = position.y
}

function showError(errMsg)
{
    console.log("error " + errMsg)
}