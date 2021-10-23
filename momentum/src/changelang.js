const langButton = document.querySelector(".lang-button");
var lang = "en";

function changeLang () {
  htmlTag = document.querySelector("html");
  console.log("htmlTag.lang = ", htmlTag.lang)
  if (htmlTag.lang == "en") {
    htmlTag.lang = "ru";
    langButton.textContent = "ru";
    lang = "ru";
  } else if (htmlTag.lang == "ru") {
    htmlTag.lang = "en";
    langButton.textContent = "en";
    lang = "en";
  }
}

langButton.addEventListener("click", changeLang)