const greetingContainer = document.querySelector(".greeting-container"),
      greetingInput = greetingContainer.querySelector(".name"),
      greeting = greetingContainer.querySelector(".greeting");

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
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function changeGreetingText(time) {
  let greetingTexts = ["Good morning,", "Good afternoon,", "Good evening,", "Good night,"];
  if (lang == "ru") {
    greetingTexts = ["Доброе утро,", "Добрый день,", "Добрый вечер,", "Доброй ночи,"];
  }
  const hours = time.split(":")[0];
  if (hours >= 6 && hours < 12) {
    greeting.textContent = greetingTexts[0];
  } else if (hours >= 12 && hours < 18) {
    greeting.textContent = greetingTexts[1];
  } else if (hours <= 23 && hours >= 18) {
    greeting.textContent = greetingTexts[2];
  } else if (hours < 6 && hours >= 00) {
    greeting.textContent = greetingTexts[3];
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