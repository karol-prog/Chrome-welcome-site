const username = document.getElementById("username");
const cryptoHead = document.getElementById("crypto-header");
const cryptoStats = document.getElementById("crypto-stats");
const currentDays = document.getElementById("current-day");
const dayTime = document.getElementById("day-time");
const weatherCity = document.getElementById("weather");
const quoteCont = document.getElementById("quote");

//feh the api url from unsplash
async function getImg() {
  try {
    const response = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=supercars"
    );
    //if response is false alert the msg
    if (!response.ok) {
      alert("Something went wrong");
    }
    //if response is OK change it to json format
    const data = await response.json();
    //style the background with img from api
    document.body.style.backgroundImage = `url("${data.urls.full}")`;
    username.textContent = `Created by: ${data.user.name}`;
  } catch {
    //default img if womething went wrong
    document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTExMDg0MjB8&ixlib=rb-4.0.3&q=85')`;
  }
}

getImg();

//function for Cryptos
async function getCrypto() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/dogecoin"
    );

    //if response is false alert the msg
    if (!response.ok) {
      alert("something went wrong");
    }
    //if response is OK change it to json format
    const data = await response.json();
    //add it to innerHTML of cryptos
    cryptoHead.innerHTML = `
        <img class="w-6 text-shadow-sm" src="${data.image.small}">
        <span class="text-2xl font-semibold ml-1 text-shadow-sm">${data.id}</span>
    `;
    cryptoStats.innerHTML = `
        <p class="text-shadow-lg">🎯: ${data.market_data.current_price.usd} $</p>
        <p class="text-shadow-lg">👆: ${data.market_data.high_24h.usd} $</p>
        <p class="text-shadow-lg">👇: ${data.market_data.low_24h.usd} $</p>
    `;
  } catch {
    (err) => console.log(err);
  }
}

getCrypto();

//time of the day
function refreshTime() {
  const date = new Date();

  let time = date.toLocaleTimeString();
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  let year = date.getFullYear();

  const currentDay = `${day}.${month}.${year}`;

  currentDays.textContent = currentDay;
  dayTime.textContent = time;
}

//refresh the time
setInterval(refreshTime, 1000);

//fetch the weather api
async function getWeather() {
  try {
    //get the position
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    //round down the numbers to 2 decimal
    const latitudeRound = Math.floor(position.coords.latitude * 100) / 100;
    const longitudeRound = Math.floor(position.coords.longitude * 100) / 100;

    //fetch the data from weather api the response
    const response = await fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitudeRound}&lon=${longitudeRound}&units=metric`
    );

    //if response is false alert the msg
    if (!response.ok) {
      alert("something went wrong");
    }

    //if response is OK change it to json format
    const data = await response.json();

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const tempRound = Math.floor(data.main.temp);

    weatherCity.innerHTML = `
        <div class="flex items-center justify-center">
            <img class="w-10" src="${iconUrl}">
            <p class="text-2xl font-bold">${tempRound} °C</p>
        </div>   
        <p class="text-2xl">${data.name}</p>
        `;
  } catch {
    (err) => console.log(err);
  }
}

getWeather();

//Quote
async function getQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");

    //if response is false alert the msg
    if (!response.ok) {
      alert("something went wrong");
    }

    //if response is OK change it to json format
    const data = await response.json();
    quoteCont.innerHTML = `
      <p class="text-xl italic">${data.content}</p>
      <p class="text-2xl font-bold">${data.author}</p>
    `;
  } catch {
    (err) => console.log(err);
  }
}

getQuote();
