function timer(parentSelector, deadLine) {
  //Timer
  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor(total / (1000 * 60 * 60) % 24),
      minutes = Math.floor((total / 1000 / 60) % 60),
      seconds = Math.floor((total / 1000) % 60);

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  };

  const getZero = (num) => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setTimer = (selector, endTime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timerId = setInterval(updateTimer);

    function updateTimer() {
      const t = getTimeRemaining(endTime);

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t == 0) {
        clearInterval(timerId);
      }
    }
    updateTimer();
  };

  setTimer(parentSelector, deadLine);
}

export default timer;