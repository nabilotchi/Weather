/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const loca = document.querySelector(".location");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const day = document.querySelector(".day");
const body = document.querySelector("body");

const form = document.querySelector("form");
const input = document.querySelector("input");
const msg = document.querySelector(".msg");

const apiKey = "d5e7bff776c9a108541f92a6bbc72089";

//coords
window.addEventListener("load", () => {
  let lon;
  let lat;

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;




      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather, timezone, } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;
//date
      d = new Date()
localTime = d.getTime()
localOffset = d.getTimezoneOffset() * 60000
utc = localTime + localOffset
var locat = utc + (1000 * timezone)
nd = new Date(locat)


      const li = document.querySelector(".container");
      li.classList.add("display");
      const markup = `
      <div class="img"><img src="${icon}" alt="${
        weather[0]["description"]
      } src="https://img.icons8.com/pastel-glyph/64/000000/rain--v2.png"/></div>
      <div class="location" data-name="${name},${sys.country}">${name}</div>
      <div class="info">
        <div class="temp">${Math.round(main.temp)}<span>°</span></div>
        <div class="desc">${weather[0]["description"]}</div>
        <div class="day">${nd}<span>,</span></div>
      </div>`;
      li.innerHTML = markup;
    })

    })

  }
  
})






form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  //check if there's already a city
  const listItems = body.querySelectorAll("body");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      //athens,gr
      if (inputVal.includes(",")) {
        //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        //athens
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather, timezone, } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      d = new Date()
localTime = d.getTime()
localOffset = d.getTimezoneOffset() * 60000
utc = localTime + localOffset
var locat = utc + (1000 * timezone)
nd = new Date(locat)


      const li = document.querySelector(".container");
      li.classList.add("display");
      const markup = `
      <div class="img"><img src="${icon}" alt="${
        weather[0]["description"]
      } src="https://img.icons8.com/pastel-glyph/64/000000/rain--v2.png"/></div>
      <div class="location" data-name="${name},${sys.country}">${name}</div>
      <div class="info">
        <div class="temp">${Math.round(main.temp)}<span>°</span></div>
        <div class="desc">${weather[0]["description"]}</div>
        <div class="day">${nd}<span>,</span></div>
      </div>`;
      li.innerHTML = markup;
      body.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

    body.classList.add("none");
  msg.textContent = "";
  
  form.reset();
  input.focus();
});