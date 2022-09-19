let dir_vector = {x:0,y:0};
let speed = 5;
let prev_time = 0;
let arr_snake = [ {x:8 ,y:12} ];
food = { x:6 , y: 8};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - prev_time)/1000 < 1/speed){
        return;
    }
    //console.log(ctime);
    prev_time = ctime;
    game();
}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < arr_snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}


function game()
{
    if(isCollide(arr_snake)){
        dir_vector =  {x: 0, y: 0}; 
        alert("Game Over");
        arr_snake = [{x:8 ,y:12} ];
    }
    if(arr_snake[0].y === food.y && arr_snake[0].x ===food.x){
        arr_snake.unshift({x: arr_snake[0].x + dir_vector.x, y: arr_snake[0].y + dir_vector.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for (let i= arr_snake.length -2 ; i>=0;i--){
        arr_snake[i+1] = {...arr_snake[i]};
    }

    arr_snake[0].x += dir_vector.x;
    arr_snake[0].y += dir_vector.y;

    main_screen.innerHTML = "";
    arr_snake.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        main_screen.appendChild(snakeElement);
    });


foodElement = document.createElement('div');
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
foodElement.classList.add('food')
main_screen.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    dir_vector = { x:0, y:1}
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            dir_vector.x = 0;
            dir_vector.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            dir_vector.x = 0;
            dir_vector.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            dir_vector.x = -1;
            dir_vector.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            dir_vector.x = 1;
            dir_vector.y = 0;
            break;
        default:
            break;
    
    }
});