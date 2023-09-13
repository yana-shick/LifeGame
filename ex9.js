let arr = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const lifeColor = "#35b674";
const noLifeColor = "#FFE17B";

// Build a Board 10*10
let board = document.getElementById("board");
//Id Index
let iY = 0;
let iX = 0;
for (let num = 0; num < 100; num++) {
	//temp variables to pass to onclick function
	let tempY = iY;
	let tempX = iX;
	let tile = document.createElement("div");
	tile.classList.add("cell");
	tile.style.backgroundColor = noLifeColor;
	tile.setAttribute("id", iY.toString() + iX.toString());
	tile.addEventListener("click", () => {
		tile.style.backgroundColor = lifeColor;
		arr[tempY][tempX] = 1;
	});
	board.appendChild(tile);
	iX++;
	if (iX === 10) {
		iY++;
		iX = 0;
	}
}
// 8 Steps

let steps = [
	[0, +1],
	[+1, +1],
	[+1, 0],
	[+1, -1],
	[0, -1],
	[-1, -1],
	[-1, 0],
	[-1, +1],
];

let toggle = true;
//End the Game
let end = () => {
	toggle = false;
};

// Start A Life
let start = async () => {
	toggle = true;
	// flag to determinate if board is empty-no more life
	let flag = true;
	let cicleNum = 0;
	while (toggle == true && flag == true) {
		flag = false;
		//create blank array as long as board
		let markArr = arr.map((row) => {
			return row.map((cell) => (cell = 0));
		});
		//start a script from a left upp angle
		let y = 0;
		let x = 0;
		//run as long as board
		for (let i = 0; i < 100; i++) {
			//variable for count live neighbors
			let count = 0;
			//check neighbors by doing 8 steps
			for (let j = 0; j < steps.length; j++) {
				let stepY = y + steps[j][0];
				let stepX = x + steps[j][1];
				if (
					//if after a step i steel on a board
					stepY > -1 &&
					stepY < 10 &&
					stepX > -1 &&
					stepX < 10 &&
					//if a neighbor is alive
					arr[stepY][stepX] === 1
				) {
					count++;
					//if initial cell is dead
				}
			}

			//if initial cell is alive cell
			if (arr[y][x] === 1) {
				// if there are 2-3 alive neighbors will be alive
				if (count === 2 || count === 3) {
					//mark my blank array
					markArr[y][x] = 1;
					// DOM coloring
					document.getElementById(
						y.toString() + x.toString()
					).style.backgroundColor = lifeColor;
					flag = true;
				}
				//else will dead
				else {
					document.getElementById(
						y.toString() + x.toString()
					).style.backgroundColor = noLifeColor;
				}
			}
			//if initial cell is dead and there is no enough naighbors
			if (arr[y][x] === 0) {
				// and there is 3 alive naighbors
				if (count === 3) {
					//mark my blank array
					markArr[y][x] = 1;
					// DOM coloring
					document.getElementById(
						y.toString() + x.toString()
					).style.backgroundColor = lifeColor;
					flag = true;
				}
				// and there is no enough naighbors or too match
				else {
					document.getElementById(
						y.toString() + x.toString()
					).style.backgroundColor = noLifeColor;
				}
			}
			//move to next cell
			x++;
			//if it end of the row- move to another row
			if (x === 10) {
				y++;
				x = 0;
			}
		}

		//return if there is no change in movement of life
		let notSame = false;
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				if (arr[i][j] != markArr[i][j]) {
					notSame = true;
				}
			}
		}
		if (notSame == false) {
			return;
		}
		//write a number of cicle
		document.getElementById("cicle").innerHTML = ++cicleNum;
		//replace initaial array with current array
		arr = [...markArr];
		// console.log(arr);

		await new Promise((r) => setTimeout(r, 600));
		console.log("one cicle of life");
	}
};
//refresh
let newLife = () => {
	//clean a arr
	let temp = arr.map((row, rowI) => {
		return row.map((cell, cellI) => {
			document.getElementById(
				rowI.toString() + cellI.toString()
			).style.backgroundColor = noLifeColor;
			cell = 0;
			return cell;
		});
	});
	arr = [...temp];
	//restart counting of cicles
	document.getElementById("cicle").innerHTML = 0;
};
