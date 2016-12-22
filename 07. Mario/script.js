(function(){
	//constants
	var STEP_X 		= 32;
	var STEP_Y 		= 32;
	var KEY_UP 		= 38;
	var KEY_DOWN 	= 40;
	var KEY_LEFT 	= 37;
	var KEY_RIGHT 	= 39;
	var LIMIT_X 	= 19;
	var LIMIT_Y 	= 19;
	var CELLS_X		= 20;
	var CELLS_Y		= 20;

	var level1 = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0],
		[1,1,1,1,1,1,1,0,1,1,5,0,0,0,0,0,0,1,1,0],
		[1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0],
		[1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,6,1,1,0],
		[1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,1,6,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,1,0,0,0,4,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,1,1,1,9,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1]
	]

	var level2 = [
		[7,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
		[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,1,1,0],
		[1,1,0,1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
		[1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1],
		[0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1],
		[1,1,1,1,0,0,0,0,1,1,1,0,1,1,1,1,0,0,0,1],
		[1,1,5,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1],
		[1,1,0,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,3,1],
		[1,1,6,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1],
		[0,0,0,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,0,1],
		[3,1,1,1,0,0,1,1,0,0,0,0,0,1,1,0,1,1,0,1],
		[0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,4,1,1,0,1],
		[0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,2]
	]

	var rows1 = 15;
	var index = 1;

	var min_colls = 2;
	var max_colls = 7;
	var right = true;

	function move_turtle (rows){
		///////ЧЕРЕПАХА ДВИЖЕТСЯ ВПРАВО//////
		if (right == true) {
			index++;
			if (index == max_colls) {
				right = false;
				index--;
			}
			currentLevel[counterLevel][rows][index] = 12;
			if (index != min_colls) {
				currentLevel[counterLevel][rows][index-1] = 0;
				fillTd(table.rows[rows].cells[index-1],rows,index-1,currentLevel[counterLevel]);
			}
		}
		//////////////////////////////////////
		////////ЧЕРЕПАХА ДВИЖЕТСЯ ВЛЕВО///////
		if (right == false) {
			index--;
			if (index == min_colls) {
				right = true;
			}
			currentLevel[counterLevel][rows][index] = 13;
			if (index < max_colls-1) {
				currentLevel[counterLevel][rows][index+1] = 0;
				fillTd(table.rows[rows].cells[index+1],rows,index+1,currentLevel[counterLevel]);
			}
		}
		//////////////////////////////////////
		fillTd(table.rows[rows].cells[index],rows,index,currentLevel[counterLevel]);
		if (currentLevel[counterLevel][rows][index] == currentLevel[counterLevel][mario.y][mario.x]) {
			alert("Ой, черепаха! Проиграл! :(");
			loss();
		}
	}

	var currentLevel = [level1, level2];
	var counterLevel = 0;
	var mario 		= {};
	var field;
	var table;
	var went_to_gate = false;
	var went_to_gate_Princess = false;
	var timerId;
	var rescued_Princess = false;

	//ПРИЗЫ//
	var money = 0;
	var number_keys = 0;
	var OPEN_CHEST = 1300;
	////////

	window.onload = function(){
		mario.x = 0;
		mario.y = 0;
		mario.div = document.getElementById("mario");
		field = document.getElementById("gameField");
		generateTable(currentLevel[counterLevel]);
		moveMario();
	}
	window.onresize = moveMario;

	document.onkeydown = function(event) {
		switch(event.keyCode) {
			case KEY_UP:
				moveUp();
				break;
			case KEY_DOWN:
				moveDown();
				break;
			case KEY_LEFT:
				moveLeft()
				break;
			case KEY_RIGHT:
				moveRight()
				break;
		}
	}

	function moveUp() {
		if(mario.y == 0 || isBarrier(mario.x, mario.y - 1)) {
			return;
		}
		if (isTurtle (mario.x, mario.y - 1)) {
			alert("Ой, черепаха! Проиграл! :(");
			loss();
			return;
		}

		//если встречаем ворота ведущие к принцессе
		if (isGatePrincess(mario.x, mario.y - 1)) {
			if (ClosedGatesPrincess()) {
				return;
			}
			//если врота к принцессе не открылись, ничего не делаем
		}
		//если встретил закрытый сундук с деньгами
		if (isClosedChest(mario.x, mario.y - 1)) {
			alert("Вы нашли "+OPEN_CHEST+" монет!");
			return;
		}

		if (isPrincess(mario.x, mario.y - 1)) {
			return;
		}
		//если встретил ворота ведущие к сокровищамы
		if (isGate(mario.x, mario.y - 1)) {
			if(number_keys > 0 && went_to_gate == false) {
				went_to_gate = true;
			} 
			else if (went_to_gate == true){
				went_to_gate = false;
				number_keys--;
			}
			else {
				return;
			}
		}
		//если встретил портал на следующий уровень
		if (isPortal_NextLev(mario.x, mario.y - 1)) {
			nextLevel();
			return;
		}
		//если встретил портал на предыдущий уровень
		if (isPortal_PrevLev(mario.x, mario.y - 1)) {
			prevLevel();
			return;
		}
		mario.y -= 1;
		moveMario();
	}
	function moveDown() {
		if(mario.y == LIMIT_Y || isBarrier(mario.x, mario.y + 1)) {
			return;
		}
		if (isTurtle (mario.x, mario.y + 1)) {
			alert("Ой, черепаха! Проиграл! :(");
			loss();
			return;
		}
		//если встретил закрытый сундук с деньгами
		if (isClosedChest(mario.x, mario.y + 1)) {
			alert("Вы нашли "+OPEN_CHEST+" монет!");
			return;
		}
		//если встретил ворота ведущие к сокровищам
		if (isGate(mario.x, mario.y + 1)) {
			if(number_keys > 0 && went_to_gate == false) {
				went_to_gate = true;
			} 
			else if (went_to_gate == true){
				went_to_gate = false;
				number_keys--;
			}
			else {
				return;
			}
		}
		//если встретил портал на следующий уровень
		if (isPortal_NextLev(mario.x, mario.y + 1)) {
			nextLevel();
			return;
		}
		//если встретил портал на предыдущий уровень
		if (isPortal_PrevLev(mario.x, mario.y + 1)) {
			prevLevel();
			return;
		}
		mario.y += 1;
		moveMario();
	}

	function moveLeft() {
		if (isTurtle (mario.x - 1, mario.y)) {
			alert("Ой, черепаха! Проиграл! :(");
			loss();
			return;
		}
		if(mario.x == 0 || isBarrier(mario.x - 1, mario.y)) {
			return;
		}
		//если встретил закрытый сундук с деньгами
		if (isClosedChest(mario.x - 1, mario.y)) {
			alert("Вы нашли "+OPEN_CHEST+" монет!");
			return;
		}
		//если встретил ворота ведущие к сокровищам
		if (isGate(mario.x - 1, mario.y)) {
			if(number_keys > 0 && went_to_gate == false) {
				went_to_gate = true;
			} 
			else if (went_to_gate == true){
				went_to_gate = false;
				number_keys--;
			}
			else {
				return;
			}
		}
		//если встретил портал на следующий уровень
		if (isPortal_NextLev(mario.x - 1, mario.y)) {
			nextLevel();
			return;
		}
		//если встретил портал на предыдущий уровень
		if (isPortal_PrevLev(mario.x - 1, mario.y)) {
			prevLevel();
			return;
		}
		mario.x -= 1;
		moveMario();
	}

	function moveRight() {
		if (isTurtle (mario.x + 1, mario.y)) {
			alert("Ой, черепаха! Проиграл! :(");
			loss();
			return;
		}
		if(mario.x == LIMIT_X || isBarrier(mario.x + 1, mario.y)) {
			return;
		}
		//если встретил закрытый сундук с деньгами
		if (isClosedChest(mario.x + 1, mario.y)) {
			alert("Вы нашли "+OPEN_CHEST+" монет!");
			return;
		}
		//если встретил ворота ведущие к сокровищам
		if (isGate(mario.x + 1, mario.y)) {
			if(number_keys > 0 && went_to_gate == false) {
				went_to_gate = true;
			} 
			else if (went_to_gate == true){
				went_to_gate = false;
				number_keys--;
			}
			else {
				return;
			}
		}
		//если встретил портал на следующий уровень
		if (isPortal_NextLev(mario.x + 1, mario.y)) {
			nextLevel();
			return;
		}
		//если встретил портал на предыдущий уровень
		if (isPortal_PrevLev(mario.x + 1, mario.y)) {
			prevLevel();
			return;
		}
		mario.x += 1;
		moveMario();
	}

	function moveMario() {
		var rect = field.getBoundingClientRect()		
		mario.div.style.top = '' + (STEP_Y * mario.y + rect.top) + 'px';
		mario.div.style.left = '' + (STEP_X * mario.x + rect.left) + 'px';
		isKey(mario.x, mario.y);
		//если марио упал в яму :)
		fellInPit(mario.x, mario.y);
	}

	function generateTable(level) {
		table = document.createElement('table');
		table.id = "table";
		table.style.zIndex = '150'
		var tr;
		var td;
		for(var i = 0; i < CELLS_X; i++) {
			tr = document.createElement('tr');
			for(var j = 0; j < CELLS_Y; j++) {
				td = document.createElement("td");
				fillTd(td,i,j,level);
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		table.style.width = "100%";
		table.style.height = "100%";

		field.appendChild(table);
		timerId = setTimeout(function turtle() {
			move_turtle(rows1);
  			timerId = setTimeout(turtle, 200);
		}, 200);
	}

	function fillTd(td,i,j,level) {
		var backgroundImage;
		switch (level[i][j]) {
			case 0:
				backgroundImage = 'url(empty_block.jpg)';
				break;
			case 1:
				backgroundImage = 'url(block.jpg)';
				break;
			case 2:
				backgroundImage = 'url(portal_next.gif)';
				break;
			case 3:
				backgroundImage = 'url(pit.png)';
				break;
			case 4:
				backgroundImage = 'url(key.png)';
			break;
			case 5:
				backgroundImage = 'url(chest_closed.png)';
			break;
			case 6:
				backgroundImage = 'url(gate_money.png)';
			break;
			case 7:
				backgroundImage = 'url(portal_prev.gif)';
			break;
			case 8:
				backgroundImage = 'url(chest_opened.png)';
			break;
			case 9:
				backgroundImage = 'url(gate_princes.png)';
			break;
			case 10:
			 //ячейка с 10 числом является пустой, но это знак того, что там был забран приз
				backgroundImage = 'url(empty_block.jpg)';
			break;
			case 11:
				backgroundImage = 'url(princess2.gif)';
			break;
			case 12:
				backgroundImage = 'url(turtle_right.png)';
			break;
			case 13:
				backgroundImage = 'url(turtle_left.png)';
			break;
		}
		td.style.backgroundImage = backgroundImage;
	}


	//является ли ячейка барьером
	function isBarrier(x,y) {
		return currentLevel[counterLevel][y][x] == 1;
	}

	//если марио встретил сундук, он его открывает и забирает деньги
	function isClosedChest(x,y) {
		if (currentLevel[counterLevel][y][x] == 5) {
			money += OPEN_CHEST;
			table.rows[y].cells[x].style.backgroundImage = 'url(chest_opened.png)';
			currentLevel[counterLevel][y][x] = 8;
			return true;
		}
		return false;
	}

	//является ли ячейка порталом на следующий уровень
	function isPortal_NextLev(x,y) {
		return currentLevel[counterLevel][y][x] == 2;
	}
	//является ли ячейка порталом на предыдущий уровень
	function isPortal_PrevLev(x,y) {
		return currentLevel[counterLevel][y][x] == 7;
	}

	//является ли ячейка воротами ведущими к сокровищам
	function isGate(x,y) {
		return currentLevel[counterLevel][y][x] == 6;
	}
	//является ли ячейка воротами ведущими к принцессе
	function isGatePrincess(x,y) {
		return currentLevel[counterLevel][y][x] == 9;
	}

	function isPrincess(x,y) {
		if (currentLevel[counterLevel][y][x] == 11) {
			table.rows[mario.y-1].cells[mario.x].backgroundImage = 'url(empty_block.jpg)';
			alert("Вы освободили принцессу! Горька! :)");
			table.rows[y].cells[x].style.backgroundImage = 'url(empty_block.jpg)';
			currentLevel[counterLevel][y][x] = 0;
			killTimer();
			rescued_Princess = true;
			return true;
		}
		return false;
	}

	//удалось ли открыть ворота?
	function ClosedGatesPrincess() {
			if(money >= 1300 && went_to_gate == false) {
				went_to_gate_Princess = true;
				money -= OPEN_CHEST;
				return false;
			} 
			else if (went_to_gate_Princess == true) {
				return false;
			}
			else {
				alert("Для открытия ворот, вам нужно 1300 монет!\nНайдите сундук с сокровищами!");
				return true;
			}
	}

	function isTurtle (x,y) {
		if (currentLevel[counterLevel][y][x] == 12 || currentLevel[counterLevel][y][x] == 13) {
			return true;
		}
		return false;
	}

	//если марио встретил ключ, он его забирает
	function isKey(x,y) {
		if(currentLevel[counterLevel][y][x] == 4) {
			table.rows[y].cells[x].style.backgroundImage = 'url(empty_block.jpg)';
			currentLevel[counterLevel][y][x] = 10; 
			number_keys++;
		}
	}
	//если марио упал в яму, он возвращается к началу первого уровня, теряя все призы
	function fellInPit(x,y) {
		if (currentLevel[counterLevel][y][x] == 3) {
			loss();
		}
	}

	function loss() {
		if (counterLevel == 0) {
			killTimer();
		}
		if (number_keys > 0 || money > 0) {
			for (var p = 0; p < currentLevel.length; ++p) {
				var IndexPrize = find_position_prize (p);
				if (IndexPrize.length > 0) {
					for (i = 0; i < IndexPrize.length; ++i) {
						return_prizes (IndexPrize[i][0],IndexPrize[i][1], IndexPrize[i][2], p);
					}
				}
			}
			number_keys = 0;
			money = 0;
			counterLevel = 0;
		}
		counterLevel = 0;
		redraw_field ();
		went_to_gate = false;
		went_to_gate_Princess = false;
		mario.x = 0;
		mario.y = 0;
		moveMario();
	}

	//возвращаем потеряные призы на их первоначальные позиции
	function return_prizes (x,y, prize, level) {
		switch (prize) {
			case 8: 
				currentLevel[level][x][y] = 5;
				table.rows[x].cells[y].style.backgroundImage = 'url(chest_closed.png)';
			break;

			case 10:
				currentLevel[level][x][y] = 4;
				table.rows[x].cells[y].style.backgroundImage = 'url(key.png)';
			break;
		}
	}

	//находим позицию забраного приза, на уровне 'level' и возвращаем индекс
	function find_position_prize (level) {
		var IndexPrize = [];
		for (i = 0; i < CELLS_X; ++i) {
			for (j = 0; j < CELLS_Y; ++j) {
				if (currentLevel[level][i][j] == 10 || currentLevel[level][i][j] == 8) {
					IndexPrize.push([i,j,currentLevel[level][i][j]]);
				}
			} 
		}
		return IndexPrize;
	}


	//если марио вошел в портал для перехода на следующий уровень
	function nextLevel() {
		if (counterLevel == 0 && rescued_Princess == false) {
			killTimer();
		}
		counterLevel++;
		
		if (currentLevel.length > counterLevel) {
			redraw_field();
		} else {
			counterLevel--;
			return;
		}
		mario.x = 0;
		mario.y = 0;
		moveMario();
	} 

	function killTimer() {
		clearTimeout(timerId);
		timerId = 0;

		for (i=min_colls; i<max_colls;++i) {
			currentLevel[counterLevel][rows1][i] = 0;
			fillTd(table.rows[rows1].cells[i],rows1,i,currentLevel[counterLevel]);
		}
	}

	//если марио вошел в портал для перехода на предыдущий уровень
	function prevLevel() {
		counterLevel--;

		redraw_field();

		var newIndexMario = find_portal ();
		mario.x = newIndexMario[1];
		mario.y = newIndexMario[0];

		moveMario();
	}

	//перерисовываем таблицу для тукущего уровня
	function redraw_field () {
		if (counterLevel == 0) {
			if(counterLevel == 0 && rescued_Princess == false) {
				timerId = setTimeout(function turtle() {
					move_turtle(rows1);
  					timerId = setTimeout(turtle, 100);
				}, 100);
			}
		}
		for (i = 0; i < CELLS_X; ++i) {
				for (j = 0; j < CELLS_Y; ++j) {
					fillTd(table.rows[i].cells[j],i,j,currentLevel[counterLevel]);
				}
			}
	}
	//находим координаты портала прошлого уровня (для перемещения марио)
	function find_portal () {
		for (i = 0; i < CELLS_X; ++i) {
			for (j = 0; j < CELLS_Y; ++j) {
				if (currentLevel[counterLevel][i][j] == 2) {
					var newIndexMario = [i, j];
					return newIndexMario;
				}
			}
		}
	}

})()