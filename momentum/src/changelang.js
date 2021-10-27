const langButton = document.querySelector(".lang-button"),
      greetInput = document.querySelector(".name"),
      setContainer = document.querySelector(".settings-block");
var lang = "en";

function changeLang () {
  htmlTag = document.querySelector("html");
  if (htmlTag.lang == "en") {
    htmlTag.lang = "ru";
    langButton.textContent = "ru";
    lang = "ru";
    changeSettingsLang();
    changeGreetingInputLang();
  } else if (htmlTag.lang == "ru") {
    htmlTag.lang = "en";
    langButton.textContent = "en";
    lang = "en";
    changeSettingsLang();
    changeGreetingInputLang();
  }
}

function changeSettingsLang () {
  if (lang == "en") {
    settingsContainer.querySelector(".lang").textContent = "Language";
    settingsContainer.querySelector(".lang-text").textContent = "Set language: ";
    settingsContainer.querySelector(".back").textContent = "Background source";
  } else if (lang == "ru") {
    settingsContainer.querySelector(".lang").textContent = "Язык";
    settingsContainer.querySelector(".lang-text").textContent = "Выберите язык";
    settingsContainer.querySelector(".back").textContent = "Источник фона";
  }
}

function changeGreetingInputLang() {
  if (lang == "ru") {
    greetingInput.placeholder = "[Введите имя]";
  } else if (lang == "en"){
    greetingInput.placeholder = "[Enter name]";
  }
}

langButton.addEventListener("click", changeLang)