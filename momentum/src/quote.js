const quoteStr = document.querySelector('.quote'),
      authorStr = document.querySelector('.author'),
      refreshQuote = document.querySelector('.change-quote'),
      lngBtn = document.querySelector(".lang-button");

async function getQuote() {
  let url = `https://type.fit/api/quotes`;
  if (lang == "ru")
    url = `./src/quotes.json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    let quoteNum = getRandomNum();
    let quoteObj = data[quoteNum];
    quoteStr.textContent = quoteObj.text;
    authorStr.textContent = quoteObj.author;
  } catch (e) {
  }
}

function  getRandomNum() {
  min = Math.ceil(1);
  max = Math.floor(70);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
  getQuote();
  refreshQuote.addEventListener("click", getQuote);
  lngBtn.addEventListener("click", getQuote);
}

init();