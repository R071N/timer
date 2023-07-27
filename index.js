const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let interval;
  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };
  const updateTimer = (seconds) => {
    timerEl.textContent = formatTime(seconds);
  };
  return (seconds) => {
    clearInterval(interval);
    let remainingSeconds = seconds;
    updateTimer(remainingSeconds);
    interval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(interval);
      } else {
        remainingSeconds--;
        updateTimer(remainingSeconds);
        if (remainingSeconds === 0) {
          clearInterval(interval);
        }
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/\D/g, '');
  // const input = inputEl.value.replace(/\D/g, '');
  // if (isNaN(input) || input === '') {
  //   inputEl.value = 'Введите число';
  //   buttonEl.disabled = true;
  // } else {
  //   inputEl.value = input;
  //   buttonEl.disabled = false;
  // }
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});