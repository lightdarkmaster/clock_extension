const langData = [
  ['Nueva configuración', 'Buenos días', 'Buenas tardes', 'Buenas noches'],
  ['Konfigurazio berria', 'Egun on', 'Arratsalde on', 'Gau on'],
  ['New Configuration', 'Good morning', 'Good afternoon', 'Good evening']
];

const clockEl = document.getElementById("clockDiv");
const msg = document.getElementById("welcome-msg");
const toggleButton = document.getElementById("clockDiv");

// Set default format if not set
if (!localStorage.getItem("timeFormat")) {
  localStorage.setItem("timeFormat", "24h");
}

checkFirstTime();
document.getElementById("lowerleft").textContent = langData[localStorage.getItem("lang")][0];

toggleButton.textContent = localStorage.getItem("timeFormat") === "24h" ? "Switch to 12-hour" : "Switch to 24-hour";

toggleButton.addEventListener("click", () => {
  const current = localStorage.getItem("timeFormat");
  const next = current === "24h" ? "12h" : "24h";
  localStorage.setItem("timeFormat", next);
  toggleButton.textContent = next === "24h" ? "Switch to 24-hour" : "Switch to 12-hour";
});

function getClockTime() {
  const date = new Date();

  let hr = date.getHours();
  const min = ("0" + date.getMinutes()).slice(-2);
  const sec = ("0" + date.getSeconds()).slice(-2);

  const format = localStorage.getItem("timeFormat");

  let displayHr = hr;
  let suffix = "";

  if (format === "12h") {
    suffix = hr >= 12 ? " PM" : " AM";
    displayHr = hr % 12;
    if (displayHr === 0) displayHr = 12;
    displayHr = ("0" + displayHr).slice(-2);
  } else {
    displayHr = ("0" + hr).slice(-2);
  }

  clockEl.innerHTML = `${displayHr}:${min}:${sec}${suffix}`;
  msg.innerHTML = `${getDayZone(hr)} ${localStorage.getItem("username")}`;
}

function getDayZone(hr) {
  const langIndex = localStorage.getItem("lang");
  if (hr < 12) {
    return langData[langIndex][1];
  } else if (hr < 18) {
    return langData[langIndex][2];
  } else {
    return langData[langIndex][3];
  }
}

function checkFirstTime() {
  if (typeof Storage !== "undefined") {
    if (localStorage.getItem("username") === null) {
      location.href = 'name.html';
    }
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}

setInterval(getClockTime, 1000);
