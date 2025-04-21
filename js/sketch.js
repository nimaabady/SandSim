let rows, col;
let grid;
let widthOfSquare = 10;

function setup() {
  createCanvas(500,500)
  rows = height / widthOfSquare;
  col = width / widthOfSquare;
  grid = make2DArray(col, rows);
  for(let i = 0; i < col; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = 0;
    }
  }
  
}

function mouseDragged(){
  if(mouseX <= width && mouseY <= height){
    let mX = floor(mouseX / widthOfSquare);
    let mY = floor(mouseY / widthOfSquare);
    grid[mX][mY] = 1
  }

  
}


function draw() {
  background(0)
  
  for(let i = 0; i < col; i++){
    for(let j = 0; j < rows; j++){
        stroke(255);
        fill(grid[i][j]*255);
        let x = i * widthOfSquare;
        let y = j * widthOfSquare;
        square(x, y, widthOfSquare);
    }
  }

    if(frameCount % 2 == 0){
      frameStep();
    }
  }



function make2DArray(cols, rows){
  let arr = new Array(cols)
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
  }

  return arr;
}

function frameStep(){
  
  let next = grid;
  for(let i = 0; i < col; i++){
    //rows -2 is so that it checks dosent check out of bound or bottom index
    for(let j = rows - 2; j >= 0; j--){
      let IsSand = next[i][j];
      if(IsSand == 1 && next[i][j + 1] == 0){
        below = next[i][j + 1] 

        //TODO: this is hanging the app when touching the
        //far right wall cause its trying to check an out of bounds index

        belowDrift = next[i + 1][j + 1];

        if(below == 0){
          next[i][j] = 0
          next[i][j + 1] = 1
        } else if(next[i + 1][j + 1] != 1){
          next[i + 1][j + 1] = 1
        } else {
          next[i + dir][j + 1] = 1;
        }
      }
      
    }
  }
  grid = next
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}