let container = document.getElementById("container");
let startBtn = document.getElementById("start");
let startBtnBorders = startBtn.getBoundingClientRect();
let scoreBanner = document.getElementById("score");
let gameOverBanner = document.getElementById("banner");
let playAgainBtn = document.getElementById("playAgainBtn");
let scoreNum = document.getElementById("scoreNum");
let fireSound = document.getElementById("fire");
let duckSound = document.getElementById("duck");
let doggy = document.getElementById("doggy");
let reload = document.getElementById("reload");

var secs;
var counter = 0;
var flag;
var ammo;
var reloader = false;
var rounds = 0;

startBtn.onclick = startGame;

playAgainBtn.addEventListener("click", function () {
	window.location.reload();
	gameOverBanner.style.display = "none";
	startBtn.style.display = "inline-block";
	scoreBanner.style.display = "inline-block";
	container.style.cursor = "crosshair";
});

document.body.addEventListener("click", bulletHole);

// Bullet hole Function
function bulletHole(event) {
	reloading();
	if (ammo > 0) {
		fireSound.play();
		let hole = document.createElement("div");
		hole.className = "bullet-hole";
		container.append(hole);
		let x = event.clientX - 4;
		let y = event.clientY - 4;
		hole.style.top = `${y}px`;
		hole.style.left = `${x}px`;
		ammo--;
		setTimeout(function () {
			hole.remove();
		}, 5000);
	}
}

// Reload state Function
function reloading() {
	if (ammo == 0) {
		reloader = true;
		reload.play();
		setTimeout(function () {
			ammo = 3;
			if (rounds < 3) {
				rounds++;
			} else {
				timer();
			}
			reloader = false;
		}, 3000);
	}
}

// Start game Function
function startGame() {
	startBtn.style.display = "none";
	counter = 0;
	ammo = 3;
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
		bird.title = "bird1";
		bird.src = "./imgs/duck2-removebg-preview.png";
		console.log(bird.title);
		bird.style.left = `${x}px`;
		bird.style.top = `${y}px`;
		container.append(bird);
		moveBirdRight(bird, y);
	}, 2000);
}

function moveBirdRight(bird, y) {
	let x = -110;
	let move = setInterval(function () {
		if (x < 1280) {
			bird.style.left = `${++x}px`;
		} else {
			bird.style.display = "none";
			clearInterval(move);
		}
	}, 0.01);

	birdFly(bird);

	bird.addEventListener("click", function (event) {
		if (!reloader) {
			++counter;
			clearInterval(move);
			let birdX = event.clientX;
			killBird(bird, y, birdX);
			duckSound.play();
		}
	});
}

// Bird flying Function
function birdFly(bird) {
	let fly = setInterval(function () {
		console.log(bird.title);
		if (
			bird.title ==
			"bird1"
		) {
			bird.src =
				"./imgs/duck2-removebg-preview.png";
			bird.title = "bird2";
			bird.style.width = "80px";
			bird.style.transform = `rotate(${7}deg) scaleX(${1})`;
		} else {
			bird.src =
				"./imgs/duck1-removebg-preview.png";
			bird.title = "bird1";
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
	score();
	deadBird(bird);
	let drop = setInterval(function () {
		if (y < 560) {
			bird.style.top = `${++y}px`;
		} else {
			bird.style.transform = `rotate(${190}deg) scaleX(${1})`;
			setTimeout(function () {
				bird.remove();
				dogFetch(drop, birdX);
			}, 1000);
		}
	});
}

// Dead bird Function
function deadBird(bird) {
	bird.src =
		"./imgs/duck2-removebg-preview.png";
	bird.style.transform = `rotate(${100}deg) scaleX(${1})`;
}

// Display score Function
function score() {
	scoreBanner.innerHTML = `score : ${counter}`;
}
score();

//Dog reveal Function
function dogFetch(drop, birdX) {
	doggy.play();
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
		if (secs <= 0 || rounds == 3) {
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

// Game ending Function
function gameOver() {
	gameOverBanner.style.display = "flex";
	scoreNum.innerHTML = counter;
	scoreBanner.style.display = "none";
	container.style.cursor = "none";
}
