// DOM Elements
const time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        dayOfTheWeek = today.getDay(),
        dayOfTheMonth = today.getDate(),
        month = today.getMonth();
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    date.innerHTML = new Date().toLocaleString("en", options);

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour >= 5 && hour < 12) {
        // Утро
        document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
        greeting.textContent = 'Good morning, ';
    } else if (hour >= 12 && hour < 16) {
        // День
        document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
        greeting.textContent = 'Good afternoon, ';
    } else if (hour >= 16 && hour < 24) {
        // Вечер
        document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/eveng.jpg')";
        greeting.textContent = 'Good evening, ';
    } else {
        document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
        greeting.textContent = 'Good night, ';
    }
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

name.addEventListener('click', selectName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', getName);
focus.addEventListener('click', selectFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', getFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();