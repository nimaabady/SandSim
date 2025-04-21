let rows, col;
let grid;
let widthOfSquare = 5;
let color = 47.5

function setup() {
  createCanvas(500,500)
  colorMode(HSB, 360, 255, 255);

  rows = height / widthOfSquare;
  col = width / widthOfSquare;
  grid = make2DArray(col, rows);
}

function mouseDragged(){
    let mX = floor(mouseX / widthOfSquare);
    let mY = floor(mouseY / widthOfSquare);
    grid[mX][mY] = color;
    grid[mX+1][mY] = color;
    grid[mX+2][mY] = color;
    grid[mX][mY+1] = color;
    grid[mX+1][mY+1] = color;
    grid[mX+2][mY+1] = color;
    grid[mX][mY+2] = color;
    grid[mX+1][mY+2] = color;
    grid[mX+2][mY+2] = color;

}

function draw() {
  background(0)
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255); 
      } else {
        fill(0); 
      }
      let x = i * widthOfSquare;
      let y = j * widthOfSquare;
      square(x, y, widthOfSquare);
    }
  }

      frameStep();
  }

//instantiate original array
function make2DArray(cols, rows){
  let arr = new Array(cols)
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
    for(let j = 0; j < arr[i].length; j++){
      arr[i][j] = 0
    }
  }
  return arr;
}

function frameStep(){
  let next = make2DArray(col, rows);
  for(let i = 0; i < col; i++){
    for(let j = 0; j < rows; j++ ){
      let state = grid[i][j];
      if(state === color ){
        let below = (j < rows - 1) ? grid[i][j + 1] : 1;
        let belowR = (i < col - 1 && j < rows - 1) ? grid[i + 1][j + 1] : 1;
        let belowL = (i > 0 && j < rows - 1) ? grid[i - 1][j + 1] : 1;
        
        if (below === 0) {
          next[i][j + 1] = state;
        } else if (belowR === 0) {
          next[i + 1][j + 1] = state;
        } else if (belowL === 0) {
          next[i - 1][j + 1] = state;
        } else {
          next[i][j] = state;
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

