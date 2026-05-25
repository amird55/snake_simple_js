var board = [];
var board_size = 20;
let isEating=0;
let dir="up";
let score=0;
let scoreStep=1;
let isPaused=false;
let max_frameTime_ms=550;
let frameTime_ms=max_frameTime_ms;
var snake=[];
function createSnake(){
    let middle=Math.floor(board_size/2);
    snake.push({r:middle  ,c:middle});
    snake.push({r:middle+1,c:middle});
    snake.push({r:middle+2,c:middle});
}
function createBoard(){
    for(let row = 0; row < board_size; row++){
        board[row] = [];
        for(let col = 0; col < board_size; col++){
            board[row][col] = 0;
        }
    }
    createSnake();
    for (let snake_part of snake){
        board[snake_part.r][snake_part.c] = 1;
    }
    addFood();
}
function addFood(){
    let r,c;
    do{
        r=Math.floor(Math.random()*board_size);
        c=Math.floor(Math.random()*board_size);
    }while(board[r][c]===1);
    board[r][c] = 2;
}
function drawBoard(){
    let boardEl=document.getElementById("board");
    boardEl.innerHTML = "";
    for(let row = 0; row < board_size; row++){
        for(let col = 0; col < board_size; col++){
            let cell = document.createElement("div");
            cell.classList.add("grid_item");
            if (board[row][col] === 1) {
                cell.classList.add("is_snake")
            }
            if (board[row][col] === 2) {
                cell.classList.add("is_food")
            }
            boardEl.appendChild(cell);
        }
    }
}
function end_game(){
    clearInterval(timeTick);
    alert("Game Over \n Your Score is: "+score+"");
    location.reload();
}
function removeTail(){
    let tail=snake.pop();
    board[tail.r][tail.c] = 0;
}
function moveUp(){
    let head= {...snake[0]};
    if((head.r===0)||(board[head.r-1][head.c]===1)){
        end_game();
    }else{
        head.r--;
        snake.unshift(head);
    }
}
function moveDown(){
    let head= {...snake[0]};
    if((head.r===board_size-1)||(board[head.r+1][head.c]===1)){
        end_game();
    }else{
        head.r++;
        snake.unshift(head);
    }
}
function moveLeft(){
    let head= {...snake[0]};
    if((head.c===0)||(board[head.r][head.c-1]===1)){
        end_game();
    }else{
        head.c--;
        snake.unshift(head);
    }
}
function moveRight(){
    let head= {...snake[0]};
    if((head.c===board_size-1)||(board[head.r][head.c+1]===1)){
        end_game();
    }else{
        head.c++;
        snake.unshift(head);
    }
}
function foodEaten(){
    isEating=2;
    score+=20*scoreStep;
    addFood();
}
function moveSnake(){
    switch(dir){
        case "up":    moveUp();    break;
        case "down":  moveDown();  break;
        case "left":  moveLeft();  break;
        case "right": moveRight(); break;
    }
    if(board[snake[0].r][snake[0].c]===2){
        foodEaten();
    }
    board[snake[0].r][snake[0].c] = 1;
    if(isEating===0){
        removeTail();
    }
    else{
        isEating--;
    }
}
function MoveFrame(){
    moveSnake();
    drawBoard();
    score+=scoreStep;
    document.getElementById("score").innerHTML=score;
    scoreStep = Math.max(Math.floor(score/70), 1);
    frameTime_ms=Math.max(max_frameTime_ms-50*scoreStep, 100);
    timeTick=setTimeout(MoveFrame, frameTime_ms);
}
function pauseGame(){}
function resumeGame(){}
document.addEventListener("keydown", function(e){
    switch(e.key){
        case "ArrowUp": dir="up"; break;
        case "ArrowDown": dir="down"; break;
        case "ArrowLeft": dir="left"; break;
        case "ArrowRight": dir="right"; break;
    }
});
createBoard();
drawBoard();

let timeTick=setTimeout(MoveFrame, frameTime_ms);
