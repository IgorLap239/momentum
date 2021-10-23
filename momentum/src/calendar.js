const dateContainer = document.querySelector(".date");

function getDate(){
  const date = new Date();
  const options = {month: 'long', day: 'numeric'};
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDate = date.toLocaleString('en-En', options);
  if (lang == "ru") {
    days = ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    currentDate = date.toLocaleString('ru-Ru', options);
  }
  const day = date.getDay();
  const res = `${days[day]}, ${currentDate}`;
  dateContainer.textContent = res;
}

function calendarFunc(){
  getDate();
  setInterval(getDate, 1000);
  langButton.addEventListener("click", changeLang);
}

calendarFunc();