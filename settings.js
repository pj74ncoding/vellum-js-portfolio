const button = document.querySelector(".save-entry-button");
const title = document.querySelector(".header-input");
const reflection = document.querySelector(".reflection-input");

let homeCardArry = [];
let deletedArray = [];

if (localStorage.getItem("vellum-entries") != null) {
  homeCardArry = JSON.parse(localStorage.getItem("vellum-entries"));
}
console.log("homeCardArray", homeCardArry);
button.addEventListener("click", () => {
  const titleInput = title.value.trim();
  // const titleInput = " " + title.value;
  // const reflectionInput = " " + reflection.value;
  const reflectionInput = reflection.value.trim();


  //   if there is nothing saved at the start save an empty array.
  if (localStorage.getItem("vellum-entries") == null) {
    localStorage.setItem("vellum-entries", "[]");
  }
  // get the new data and add it to the old data
  const createdArray = JSON.parse(localStorage.getItem("vellum-entries"));
  createdArray.push({
    day: dayName,
    date: todaysdate,
    month: monthName,
    year: year,
    title: titleInput,
    reflection: reflectionInput,
  });

  // save the new data and old data to local storage
  localStorage.setItem("vellum-entries", JSON.stringify(createdArray));
  //   clear the input fields
  title.value = "";
  reflection.value = "";
  console.log("homeCardArray", homeCardArry);
  console.log("newarray", deletedArray);
});

const today = new Date();
const todaysdate = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
console.log(`day ${todaysdate} month ${month} year ${year}`);

// Create a new Date object for the current date/time
const date = new Date();

// Array of month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Array of day names
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Extract day and month as words
const dayName = dayNames[date.getDay()]; // e.g., "Monday"
const monthName = monthNames[date.getMonth()]; // e.g., "July"

// Output
console.log(`${dayName}, ${todaysdate} ${monthName}, ${year}`); // Example: "Monday, July"

const currentDate = document.getElementById("form-date");
currentDate.innerHTML = `${dayName},gjhjj ${todaysdate} ${monthName} ${year}`;
