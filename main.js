// DOM Elements
const prevBackButton = document.querySelector('#prev-back-button'),
    currBackButton = document.querySelector('#curr-back-button'),
    nextBackButton = document.querySelector('#next-back-button'),
    time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    quote = document.querySelector('.quote'),
    quoteBody = document.querySelector('.quote-body'),
    author = document.querySelector('.author'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    humidity = document.querySelector('.humidity'),
    windSpeed = document.querySelector('.wind-speed'),
    city = document.querySelector('.city');

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

async function getQuote() {
    const res = await fetch(`https://type.fit/api/quotes`);
    const data = await res.json();
    i = randInt(0, 1643 - 1);
    quote.textContent = data[i].text;
    if (data[i].author != null)
        author.textContent = "- "+data[i].author;
    else
        author.textContent = "";
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=1c77421b3dcb55d2c0da4104a6ada19f&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
  
    weatherIcon.className = 'weather-icon owf';
    if (data.cod == 200) {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        humidity.textContent = data.main.humidity+"%";
        windSpeed.textContent = data.wind.speed+"m/s";
    } else {
        temperature.textContent = "Can't load weather";
        windSpeed.textContent = data.message;
        humidity.textContent = "";
    }
}

// При клике в поле ввода текст, который там был, исчезает
function selectCity() {
    city.textContent = '';
}

// Get city
function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '(Enter city)';
    } else {
        city.textContent = localStorage.getItem('city');
        getWeather();
    }
}

// Set city
function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (e.target.innerText != '')
                localStorage.setItem('city', e.target.innerText);
                city.blur();
        }
    } else {
        if (e.target.innerText != '')
            localStorage.setItem('city', e.target.innerText);
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
city.addEventListener('click', selectCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', getCity);

quoteBody.addEventListener('click', getQuote);

// Run
showTime();
setInterval(showTime, 1000);
setGreetHourly();
setInterval(setGreetHourly, 60*60*1000);
getName();
getFocus();
getQuote();
getCity();