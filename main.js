// DOM Elements
const prevBackButton = document.querySelector('#prev-back-button'),
    currBackButton = document.querySelector('#curr-back-button'),
    nextBackButton = document.querySelector('#next-back-button'),
    time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const backgrounds = []
let currBackgroung = (new Date()).getHours();
let disableTrantition = false;

// Массив фоновых изображений
for (let i = 0; i < 5; i++) {
    backgrounds.push("assets/images/night/" + addZero(randInt(1, 20)) + ".jpg");
}

for (let i = 0; i < 7; i++) {
    backgrounds.push("assets/images/morning/" + addZero(randInt(1, 20)) + ".jpg");
}
 
for (let i = 0; i < 4; i++) {
    backgrounds.push("assets/images/day/" + addZero(randInt(1, 20)) + ".jpg");
}

for (let i = 0; i < 8; i++) {
    backgrounds.push("assets/images/evening/" + addZero(randInt(1, 20)) + ".jpg");
}

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    date.innerHTML = new Date().toLocaleString("en", {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
}

// Установить фон
function setBackgrount() {
    if (!disableTrantition) {
        document.body.style.backgroundImage = "url('" + backgrounds[currBackgroung] + "')";
        disableTrantition = true;
        setTimeout(function () {
            disableTrantition = false;
        }, 1000);
    }
}

// Set Background and Greeting
function setGreetHourly() {
    let today = new Date(),
        hour = today.getHours();

    if (hour >= 5 && hour < 12) {
        // Утро
        greeting.textContent = 'Good morning, ';
    } else if (hour >= 12 && hour < 16) {
        // День
        greeting.textContent = 'Good afternoon, ';
    } else if (hour >= 16 && hour < 24) {
        // Вечер
        greeting.textContent = 'Good evening, ';
    } else {
        // Ночь
        greeting.textContent = 'Good night, ';
    }
    currBackgroung = (new Date()).getHours();
    setBackgrount();
}

// Предыдущий фон
function prevBg() {
    if (currBackgroung == 0)
        currBackgroung = 23;
    else
        currBackgroung--;
    setBackgrount();
}

// Фон в соответствии со временем
function currBg() {
    currBackgroung = (new Date()).getHours();
    setBackgrount();
}

// Следующий фон
function nextBg() {
    if (currBackgroung == 23)
        currBackgroung = 0;
    else
        currBackgroung++;
    setBackgrount();
}

// При клике в поле ввода текст, который там был, исчезает
function selectName() {
    name.textContent = '';
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '(Enter name)';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText != '')
                localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        if (e.target.innerText != '')
            localStorage.setItem('name', e.target.innerText);
    }
    
}

// При клике в поле ввода текст, который там был, исчезает
function selectFocus() {
    focus.textContent = '';
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '(Enter Focus)';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText != '')
                localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        if (e.target.innerText != '')
            localStorage.setItem('focus', e.target.innerText);
    }
}

prevBackButton.addEventListener('click', prevBg);
currBackButton.addEventListener('click', currBg);
nextBackButton.addEventListener('click', nextBg);

name.addEventListener('click', selectName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', getName);
focus.addEventListener('click', selectFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', getFocus);

// Run
showTime();
setInterval(showTime, 1000);
setGreetHourly();
setInterval(setGreetHourly, 60*60*1000);
getName();
getFocus();