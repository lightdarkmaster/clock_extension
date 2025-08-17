/**
 * This script manages the clock and welcome message on the new tab page.
 * It also handles the time format and language selection.
 */

// Define the languages and their corresponding greetings
const langData = [
  ['Nueva configuración', 'Buenos días', 'Buenas tardes', 'Buenas noches'],
  ['Konfigurazio berria', 'Egun on', 'Arratsalde on', 'Gau on'],
  ['New Configuration', 'Good morning', 'Good afternoon', 'Good evening']
];

// Get the DOM elements
const clockEl = document.getElementById("clockDiv");
const msg = document.getElementById("welcome-msg");
const toggleButton = document.getElementById("clockDiv");

// Set the default time format if not already set
if (!localStorage.getItem("timeFormat")) {
  localStorage.setItem("timeFormat", "24h");
}

// Check if it's the first time the user visits the page
checkFirstTime();

// Set the lower left corner text based on the selected language
document.getElementById("lowerleft").textContent = langData[localStorage.getItem("lang")][0];

// Set the toggle button text based on the selected time format
toggleButton.textContent = localStorage.getItem("timeFormat") === "24h" ? "Switch to 12-hour" : "Switch to 24-hour";

// Toggle the time format when the toggle button is clicked
toggleButton.addEventListener("click", () => {
  const current = localStorage.getItem("timeFormat");
  const next = current === "24h" ? "12h" : "24h";
  localStorage.setItem("timeFormat", next);
  toggleButton.textContent = next === "24h" ? "Switch to 24-hour" : "Switch to 12-hour";
});

/**
 * Get the current time and update the clock and welcome message.
 */
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

/**
 * Get the appropriate greeting based on the time of day.
 * @param {number} hr - The hour of the day.
 * @returns {string} - The greeting for the specified hour.
 */
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

/**
 * Check if it's the first time the user visits the page.
 * If it is, redirect to the name selection page.
 */
function checkFirstTime() {
  if (typeof Storage !== "undefined") {
    if (localStorage.getItem("username") === null) {
      location.href = 'name.html';
    }
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}

// Update the clock and welcome message every second
setInterval(getClockTime, 1000);

