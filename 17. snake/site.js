(function () {
    var ctx;
    var height = 450;
    var width = 450;
    var cellSize = 25;
    var snakeData;
    var foodData;
    var speed = 80;
    //colors
    var colorSnake = "rgb(0,149,0)";
    var colorBorder = "darkgreen";
    var colorCellBorder = "darkgreen";

    var defaultSnakeSize = 3;
    var points = 0;
    var life = 3;

    var lifeField;
    var pointsField;
    var newGameButton;
    var snakeSize;

    var directionUp = 38;
    var directionDown = 40;
    var directionLeft = 37;
    var directionRight = 39;
    var directionCurrent = directionRight;

    var gameLoop;
    window.onload = function () {
        var canvas = document.getElementById("canvas");
        lifeField = document.getElementById("life");
        pointsField = document.getElementById("pointers");
        newGameButton = document.getElementById("newGame");
    	
		snakeSize = document.getElementById("snake_size");

		newGameButton.onclick = newGame;
        ctx = canvas.getContext("2d");
        ctx.strokeStyle = colorBorder;
        /*Отрисовка границы игрового поля*/
        ctx.strokeRect(0, 0, width, height);
        initSnake();
        foodData = {};
        generateFood();
        gameLoop = setInterval(gameLoopFunction, speed);
    };

    function initSnake() {
        snakeData = [];
        for (var i = 0; i < defaultSnakeSize; i++) {
            snakeData.push({x: i, y: 0});
        }
    }

    function draw() {
        ctx.clearRect(1, 1, width - 2, height - 2);
        for (var i = 0; i < snakeData.length; ++i) {
            drawCell(snakeData[i].x, snakeData[i].y);
        }
        drawCell(foodData.x, foodData.y);
    }

    function drawCell(x, y) {
        ctx.fillStyle = colorSnake;
        ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 1, cellSize - 1);
        ctx.strokeStyle = colorCellBorder;
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
    }

    function generateFood() {
        var cont;
        while(true) {
            cont = false;
            foodData.x = Math.floor(Math.random()*width/cellSize) * 100 % (width/cellSize) + 1;
            foodData.y = Math.floor(Math.random()*width/cellSize)  * 100 % (height/cellSize) + 1;
            for(var i = 0; i < snakeData.length; i++) {
                if(foodData.x == snakeData[i].x && foodData.y == snakeData[i].y) {
                    cont = true;
                    break;
                }
            }
            if(!cont) {
                break;
            }
        }
    }
    var past_key;
    function gameLoopFunction() {
        var head = snakeData[snakeData.length - 1];
        var newHead;
        switch (directionCurrent) {
            case directionRight:
            	if (past_key === directionLeft) {
            		directionCurrent = directionLeft;
            		gameLoopFunction();
            	} //////////////////////////////////////////////////////////////
            	else {
                newHead = {x: head.x + 1, y: head.y};
                past_key = directionRight;
            	}
                break;
            case directionLeft:
            	if (past_key === directionRight) {
            		directionCurrent = directionRight;
            		gameLoopFunction();
            	} 
            	else {
                newHead = {x: head.x - 1, y: head.y};
                past_key = directionLeft;
            	}
                break;
            case directionDown:
           		if (past_key === directionUp) {
            		directionCurrent = directionUp;
            		gameLoopFunction();
            	} 
            	else {
                newHead = {x: head.x, y: head.y + 1};
                past_key = directionDown;
            	}
                break;
            case directionUp:
            	if (past_key === directionDown) {
            		directionCurrent = directionDown;
            		gameLoopFunction();
            	} 
            	else {
            		newHead = {x: head.x, y: head.y - 1};
                	past_key = directionUp;
            	}
                break;
        }

        if(clashWithSnake (newHead)) {
        	return;
        }

        if(isFieldBoundary (newHead.x, newHead.y)) {
        	loss();
            return;
        }
        takeFood();
        snakeData.push(newHead);
        draw();
    }

    document.onkeydown = function(event) {
        var key = event.which;
        if (key === directionRight || key === directionUp || 
        	key === directionLeft || key === directionDown) {
        	directionCurrent = key;
   		}
    }

    function takeFood () {
    	if(foodData.x == snakeData[snakeData.length-2].x && foodData.y == snakeData[snakeData.length-2].y) {
            generateFood();
            points += 18;
            pointsField.innerHTML = ("  " + points + " ");
            snakeSize.innerHTML = ("  " + (snakeData.length+1) + " ");
        }
        else {
            snakeData.shift(); //удаление из начала
        }
    }

    function clashWithSnake (newHead) {
    	 for (var i = 0; i < snakeData.length; i++) {
        	if (snakeData[i].x == newHead.x && snakeData[i].y == newHead.y) {
        		generateFood();
        		loss();
        		return true;
        	}
        }
    }

    function isFieldBoundary (x, y) {
        if (x < 0 || x > width/cellSize-1) {
            return true;
        }
        if(y < 0 || y > height/cellSize-1) {
             return true;
        }
        return false;
    }

    function loss () {
    	life--;
    	lifeField.innerHTML = ("  " + life + " ");
    	directionCurrent = directionRight;
    	past_key = directionRight;
    	snakeSize.innerHTML = ("  " + defaultSnakeSize + " ");
    	if (life == 0) {
			clearInterval(gameLoop);
			alert("Вы потеряли все жизни :( \nОчки: " + points);
			return;
    	}
    	initSnake();
    }

    function newGame () {
    	if(life !== 0) {
    		clearInterval(gameLoop);
    	}
    	directionCurrent = directionRight;
    	past_key = directionRight;
    	points = 0;
		life = 3;
		lifeField.innerHTML = ("  " + life + " ");
		pointsField.innerHTML = ("  " + points + " ");
		snakeSize.innerHTML = ("  " + defaultSnakeSize + " ");
		generateFood();
		initSnake();
		gameLoop = setInterval(gameLoopFunction, speed);
    }

})();