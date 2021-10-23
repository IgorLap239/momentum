const dateContainer = document.querySelector(".date")

function getDate(){
  const date = new Date();
  /*const days = ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]*/
  days = ["Sunday", "Понедельник", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const options = {month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleString('en-En', options);
  const day = date.getDay();
  const res = `${days[day]}, ${currentDate}`;
  dateContainer.textContent = res;
}

function init(){
  getDate();
  setInterval(getDate, 1000);
}

init();