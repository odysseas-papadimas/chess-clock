const btn1 = document.querySelector(".btn-1");
const btn2 = document.querySelector(".btn-2");

const pause = document.querySelector(".pause");
const fullScreen = document.querySelector(".full-screen");
const options = document.querySelector(".options");
const minutesInput = document.querySelector("#minutes");
const incrementInput = document.querySelector("#increment");
const optionsDone = document.querySelector(".options-done");
const modal = document.querySelector(".modal");
const resetModal = document.querySelector(".reset-modal");
const resetYes = document.querySelector(".yes");
const resetNo = document.querySelector(".no");


const click1 = new Audio("./audio/click1.mp3");
const click2 = new Audio("./audio/click2.mp3");
const lose = new Audio("./audio/lose.mp3");

let startingTime = 10;
let increment = 5;
let time1 = startingTime * 60;
let time2 = startingTime * 60;
let timeInterval;

let gameStarted = false;
let lost = false;
let isFullScreen = false;

function turn() {
    clearInterval(timeInterval);
    if (btn1.classList.contains("active")) {

        btn1.classList.remove("active");
    } else {

        btn2.classList.remove("active");
    }
    console.log('Turn!');
}

const pauseHandler = () => {
    pause.classList.remove("show");
    turn();
}

pause.addEventListener("click", pauseHandler);

const fullScreenHandler = () => {
    if (!isFullScreen) openFullscreen();
    else closeFullscreen();
}

fullScreen.addEventListener("click", fullScreenHandler);

const optionsHandler = () => {
    modal.style.display = 'block';
}

options.addEventListener("click", optionsHandler);

optionsDone.addEventListener("click", () => {
    if (!isNaN(parseInt(minutesInput.value)) && !isNaN(parseInt(incrementInput.value))) {
        startingTime = parseInt(minutesInput.value);
        increment = parseInt(incrementInput.value) + 1;
        console.log(startingTime, increment);
        modal.style.display = 'none';
        time1 = startingTime * 60;
        time2 = startingTime * 60;

        btn1.textContent = `${startingTime}:00`;
        btn2.textContent = `${startingTime}:00`;
    } else {

    }
});

btn1.addEventListener("click", btn1Func);

function btn1Func() {
    if (pause.classList[1] != 'show' && gameStarted == true && !btn2.classList.contains("active")) {
        pause.classList.add("show");
        startTimer(btn2);
    } else if (!btn1.classList.contains("active") && !btn2.classList.contains("active") && !lost) {
        click1.play();
        gameStarted = true;
        startTimer(btn2);
    } else if (btn1.classList.contains("active") && !lost) {
        click1.play();
        time1 += increment;
        updateTimer1(false);
        turn();
        startTimer(btn2);
    } else if (lost) {
        reset();
    }
}

btn2.addEventListener("click", btn2Func);

function btn2Func() {
    if (pause.classList[1] != 'show' && gameStarted == true && !btn1.classList.contains("active")) {
        pause.classList.add("show");
        console.log('hello');
        startTimer(btn1);
    } else if (!btn2.classList.contains("active") && !btn1.classList.contains("active") && !lost) {
        click2.play();
        gameStarted = true;
        startTimer(btn1);
    } else if (btn2.classList.contains("active")) {
        click2.play();
        time2 += increment;
        updateTimer2(false);
        turn();
        startTimer(btn1);
    } else if (lost) {
        reset();
    }
}

function reset() {
    resetModal.style.display = 'block';
    console.log('hi');
    resetYes.addEventListener("click", () => location.reload());
    resetNo.addEventListener("click", () => resetModal.style.display = 'none');
}

function startTimer(button) {
    if (button == btn1) updateTimer1(true);
    else updateTimer2(true);

    gameStarted = true;

    timeInterval = setInterval(() => {
        if (button == btn1) updateTimer1(true);
        else updateTimer2(true);
    }, 1000);
}

function updateTimer1(update) {
    const minutes = Math.floor(time1 / 60);
    let seconds = time1 % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    btn1.innerHTML = `${minutes}:${seconds}`;

    //Update the timer AND countdown
    if (update) {
        btn1.classList.add("active");
        time1--;
    }

    //Lose
    if (time1 < 0) {
        lose.play();
        clearInterval(timeInterval);
        btn1.classList.remove("active");
        btn1.classList.add("lost");

        lost = true;
        removeListeners();

        window.addEventListener("click", (e) => {
            if(e.target != resetNo) reset();
        });
    }
}

function updateTimer2(update) {
    const minutes = Math.floor(time2 / 60);
    let seconds = time2 % 60;
    console.log('1', seconds);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    btn2.innerHTML = `${minutes}:${seconds}`;

    if (update) {
        btn2.classList.add("active");
        time2--;
    }

    if (time2 <= 0) {
        lose.play();
        clearInterval(timeInterval);
        btn2.classList.remove("active");
        btn2.classList.add("lost");

        lost = true;
        removeListeners();

        window.addEventListener("click", (e) => {
            if(e.target != resetNo) reset();
        });
    }
}

function removeListeners() {
    options.removeEventListener("click", optionsHandler);
    pause.removeEventListener("click", pauseHandler);
    fullScreen.removeEventListener("click", fullScreenHandler);
}

const elem = document.documentElement;
/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }

    isFullScreen = true;
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }

    isFullScreen = false;
}