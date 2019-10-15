let canv = document.createElement('canvas');

let width = canv.width = window.innerWidth;
let height = canv.height = window.innerHeight;

let ctx = canv.getContext('2d');
document.body.appendChild(canv);


let halfWidth = width/3;
let halfHeight = height/3;

let gameSize = 400;
let halfGameSize = gameSize / 2;
let plus = 260;

ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

let ended = false;

let GAMESIZE = gameSize+plus
//////////
// INIT //
//////////
let beginX = halfWidth - halfGameSize,
		beginY = halfHeight - halfGameSize,
		turn = 0,
		map = [];

// make map
for (let i = 0; i < 5; i++) {
	map[i] = [];

	for (let j = 0; j < 5; j++) {
		map[i][j] = '';
	}
}






loop();


function loop() {
	draw();

	requestAnimationFrame(loop);
}



function draw() {
	drawGrid();

	ctx.font = '100px sans-serif';

	// draw letters
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {

			ctx.fillText(map[j][i], 
				beginX + gameSize/3 * i + gameSize/3/2, 
				beginY + gameSize/3 * j + gameSize/3/2);
		}
	}
}



function drawGrid() {
	ctx.strokeRect(beginX, beginY, gameSize+plus, gameSize+plus);

	ctx.beginPath();
	// vertical left
	ctx.moveTo(beginX + gameSize/3, beginY);
	ctx.lineTo(beginX + gameSize/3, beginY + gameSize+plus);

	// vertical right
	ctx.moveTo(beginX + gameSize/3*2, beginY);
	ctx.lineTo(beginX + gameSize/3*2, beginY + gameSize+plus);
	// vertical right
		ctx.moveTo(beginX + gameSize/3*3, beginY);
	ctx.lineTo(beginX + gameSize/3*3, beginY + gameSize+plus);

	ctx.moveTo(beginX + gameSize/3*4, beginY);
	ctx.lineTo(beginX + gameSize/3*4, beginY + gameSize+plus);

	// horizontal top
	ctx.moveTo(beginX, beginY + gameSize/3);
	ctx.lineTo(beginX + gameSize+plus, beginY + gameSize/3);

	// horizontal bottom

	ctx.moveTo(beginX, beginY + gameSize/3*2);
	ctx.lineTo(beginX + gameSize+plus, beginY + gameSize/3*2);
// horizontal bottom
	ctx.moveTo(beginX, beginY + gameSize/3*2);
	ctx.lineTo(beginX + gameSize+plus, beginY + gameSize/3*2);
// horizontal bottom
	ctx.moveTo(beginX, beginY + gameSize/3*3);
	ctx.lineTo(beginX + gameSize+plus, beginY + gameSize/3*3);
// horizontal bottom
	ctx.moveTo(beginX, beginY + gameSize/3*4);
	ctx.lineTo(beginX + gameSize+plus, beginY + gameSize/3*4);
// horizontal bottom


	ctx.stroke();
	ctx.closePath();
}



document.addEventListener('click', e => {
	// check if we clicked inside square
	if (beginX            > e.clientX || 
			beginX + GAMESIZE < e.clientX ||
			beginX + GAMESIZE < e.clientX ||
			beginY            > e.clientY ||
			beginY + GAMESIZE < e.clientY ||
			beginY + GAMESIZE < e.clientY) return;


	if (!ended)
		step(e.clientX - beginX, e.clientY - beginY);
});



function step(ox, oy) {
	// calc square coords
	let x = Math.floor(ox / (gameSize/3)),
			y = Math.floor(oy / (gameSize/3));


	if (map[y][x] !== '') return;

	if (turn === 0) {
		map[y][x] = 'x';
		turn = 1;
	} else {
		map[y][x] = 'o';
		turn = 0;
	}

	// if somebody won
	if (check()) {
		ended = true;

		setTimeout(() => {
			alert((turn === 0 ? 'Second' : 'First') + ' player win');
		}, 100);
	}
}



function check() {
	// checking rows
	for (let i = 0; i < 5; i++) {
		if (map[i][0] === '') continue;
		let l = true;

		for (let j = 1; j < 5; j++)
			if (map[i][0] !== map[i][j]) l = false;

		if (l) return true; 
	}


	// checking columns
	for (let i = 0; i < 5; i++) {
		if (map[0][i] === '') continue;
		let l = true;

		for (let j = 1; j < 5; j++)
			if (map[0][i] !== map[j][i]) l = false;

		if (l) return true;
	}

	// checking first diagonal
	if (map[0][0] !== '' && 
			map[0][0] === map[1][1] && 
			map[0][0] === map[2][2] && 
			map[0][0] === map[3][3] && 
			map[0][0] === map[4][4]) return true;

	// checking second diagonal
	if (map[0][4] !== '' && 
			map[0][4] === map[1][3] && 
			map[0][4] === map[2][2]	&&
			map[0][4] === map[3][1]	&&
			map[0][4] === map[4][0]) return true;


	return false;
}
