const greetingContainer = document.querySelector(".greeting-container");
const greetingInput = greetingContainer.querySelector(".name");
const greeting = greetingContainer.querySelector(".greeting");

const userLS = "currentUser";

function saveName(text){
  localStorage.setItem(userLS, text);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = greetingInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName(){
  greetingContainer.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
  greetingInput.value = `${text}`;
}

function loadName(){
  const currentUser = localStorage.getItem(userLS);
  if (currentUser === null){
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function changeGreetingText(time) {
  const hours = time.split(":")[0];
  if (hours >= 6 && hours < 12) {
    greeting.textContent = "Good morning";
  } else if (hours >= 12 && hours < 18) {
    greeting.textContent = "Good afternoon";
  } else if (hours <= 23 && hours >= 18) {
    greeting.textContent = "Good evening";
  } else if (hours < 6 && hours >= 00) {
    greeting.textContent = "Good night ";
  }
}

function getTime() {
  const time = document.querySelector(".time");
  changeGreetingText(time.datetime);
}

function init(){
  greetingInput.addEventListener("change", (e) => {
    localStorage.removeItem(userLS)
    askForName();
    handleSubmit(e);
  });
  loadName();
  getTime();
  setInterval(getTime, 1000);
};

init();