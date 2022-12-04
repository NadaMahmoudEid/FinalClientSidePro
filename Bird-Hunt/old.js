// let aim = document.getElementById("aim");
let container = document.getElementById("container");
let startBtn = document.getElementById("start");
let startBtnBorders = startBtn.getBoundingClientRect();
let scoreBanner = document.getElementById("score");
let gameOverBanner = document.getElementById("banner");
let playAgainBtn = document.getElementById("playAgainBtn");
let scoreNum = document.getElementById("scoreNum");


var secs;
let counter = 0;
var flag;
var ammo = 10;

// startBtn.addEventListener("click", () => {
// 	// goAim();
// 	// document.body.addEventListener("mousemove", goAim);
// 	startGame();
// });
startBtn.onclick = startGame;

playAgainBtn.addEventListener("click", function () {
	gameOverBanner.style.display = "none";
	startBtn.style.display = "inline-block";
    scoreBanner.style.display = "inline-block";
    container.style.cursor = "crosshair"
});

document.body.addEventListener("click", bulletHole);

// Mouse Aim Function
// function goAim(event) {
// 	aim.style.display = "inline-block";
// 	document.body.style.cursor = "none";
// 	let x = event.clientX - 25;
// 	let y = event.clientY - 25;
// 	aim.style.top = `${y}px`;
// 	aim.style.left = `${x}px`;
// }

// Bullet hole Function
function bulletHole(event) {
	let hole = document.createElement("div");
	hole.className = "bullet-hole";
	container.append(hole);
	let x = event.clientX - 4;
	let y = event.clientY - 4;
	hole.style.top = `${y}px`;
	hole.style.left = `${x}px`;
	ammo -= 1;
	ammo();
	setTimeout(function () {
		hole.remove();
	}, 5000);
	//     if (flag) {
	// }
}

// Start game Function
function startGame() {
	startBtn.style.display = "none";
    counter = 0;
	ammo = 10;
	timer();
    score();
	createBird();
}

// Create bird Function
function createBird() {
	flag = setInterval(function () {
		let x = -110;
		let y = Math.round(Math.random() * 350);
		let bird = document.createElement("img");
		bird.id = "bird";
		bird.src = "http://127.0.0.1:5500/imgs/duck2-removebg-preview.png";
		bird.style.left = `${x}px`;
		bird.style.top = `${y}px`;
		container.append(bird);
		// console.log(bird.src)
		moveBirdRight(bird, y);
	}, 2000);
}
function moveBirdRight(bird, y) {
	let x = -110;
	let move = setInterval(function () {
		if (x < 1280) {
			bird.style.left = `${++x}px`;
		} else {
			// bird.style.visibility = "hidden";
			bird.style.display = "none";
			clearInterval(move);
		}
	}, 0.01);

	birdFly(bird);
	// let fly = setInterval(function () {
	// 	if (bird.src == "http://127.0.0.1:5500/imgs/duck1-removebg-preview.png") {
	// 		bird.src = "http://127.0.0.1:5500/imgs/duck2-removebg-preview.png";
	// 		bird.style.width = "80px";
	// 		bird.style.transform = `rotate(${7}deg) scaleX(${1})`;
	// 	} else {
	// 		bird.src = "http://127.0.0.1:5500/imgs/duck1-removebg-preview.png";
	// 		bird.style.width = "60px";
	// 		bird.style.transform = `rotate(${45}deg) scaleX(${1})`;
	// 	}
	// }, 200);

	bird.addEventListener("click", function (event) {
		++counter;
		// setTimeout(dogFetch, 2000, bird)
		clearInterval(move);
		// clearInterval(fly);
		let birdX = event.clientX;
		killBird(bird, y, birdX);
	});
}

// Bird flying Function
function birdFly(bird) {
	let fly = setInterval(function () {
		if (bird.src == "http://127.0.0.1:5500/imgs/duck1-removebg-preview.png") {
			bird.src = "http://127.0.0.1:5500/imgs/duck2-removebg-preview.png";
			bird.style.width = "80px";
			bird.style.transform = `rotate(${7}deg) scaleX(${1})`;
		} else {
			bird.src = "http://127.0.0.1:5500/imgs/duck1-removebg-preview.png";
			bird.style.width = "60px";
			bird.style.transform = `rotate(${45}deg) scaleX(${1})`;
		}
	}, 200);
	bird.addEventListener("click", function () {
		clearInterval(fly);
	});
}

// Kill bird Function
function killBird(bird, y, birdX) {
	// let flag = false
	score();
	deadBird(bird);
	let drop = setInterval(function () {
		if (y < 560) {
			bird.style.top = `${++y}px`;
		} else {
			bird.style.transform = `rotate(${190}deg) scaleX(${1})`;
			setTimeout(function () {
				bird.remove();
				// console.log(h)

				dogFetch(drop, birdX);
				// console.log("test")
				// let dog = document.createElement("img");
				// dog.src = "./imgs/docbg.png";
				// dog.id = "dog";
				// document.body.append(dog)
				// setTimeout(function () {
				//     dog.remove()
				//     clearInterval(drop)
				// },100)
			}, 1000);
		}
	});
}

// Dead bird Function
function deadBird(bird) {
	bird.src = "http://127.0.0.1:5500/imgs/duck2-removebg-preview.png";
	bird.style.transform = `rotate(${100}deg) scaleX(${1})`;
}

// Display score Function
function score() {
	scoreBanner.innerHTML = `score : ${counter}`;
}
score();

//Dog reveal Function
function dogFetch(drop, birdX) {
	// console.log(birdX)
	let dog = document.createElement("img");
	dog.src = "./imgs/docbg.png";
	dog.id = "dog";
	dog.style.left = `${birdX}px`;
	document.body.append(dog);
	setTimeout(function () {
		dog.remove();
		clearInterval(drop);
	}, 10);
}

// Timer Function
function timer() {
	let timer = document.getElementById("Time");
	timer.style.display = "inline-block";
	secs = 30;
	timer.innerHTML = `${secs} Secs`;
	let timerInterval = setInterval(inner, 1000);

	function inner() {
		if (secs <= 0 || ammo <= 0) {
			clearInterval(timerInterval);
			timer.innerHTML = `Game Over`;
			timer.style.paddingLeft = "15px";
			timer.style.paddingTop = "3px";
			clearInterval(flag);
			gameOver();
		} else {
			timer.style.paddingLeft = "10px";
			timer.style.paddingTop = "10px";
			--secs;
			timer.innerHTML = `${secs} Secs`;
		}
	}
}

function ammoFun() {
	ammo
}

// Game ending Function
function gameOver() {
	gameOverBanner.style.display = "flex";
	scoreNum.innerHTML = counter;
	scoreBanner.style.display = "none";
    container.style.cursor = "none";
}

// // Remove hole Function
// function preventHole() {
//     hole[i].remove()
// }
