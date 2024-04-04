function handleButtonAction(action, inputField, maxValue) {
  let value = parseInt(inputField.value) || 0;
  if (action === 'add') {
      value = (value + 1) % (maxValue + 1);
  } else if (action === 'sub') {
      value = (value - 1 + (maxValue + 1)) % (maxValue + 1);
  }
  inputField.value = value.toString().padStart(2, '0');
}

document.getElementById('addh').addEventListener("click", () => handleButtonAction('add', timerhr, 23));
document.getElementById('subh').addEventListener("click", () => handleButtonAction('sub', timerhr, 23));
document.getElementById('addm').addEventListener("click", () => handleButtonAction('add', timermin, 59));
document.getElementById('subm').addEventListener("click", () => handleButtonAction('sub', timermin, 59));
document.getElementById('adds').addEventListener("click", () => handleButtonAction('add', timersec, 59));
document.getElementById('subs').addEventListener("click", () => handleButtonAction('sub', timersec, 59));

function handleInputChange(inputField, maxValue) {
  let value = parseInt(inputField.value) || 0;
  if (value > maxValue) {
      value = 0;
  } else if (value < 0) {
      value = maxValue;
  }
  inputField.value = value.toString().padStart(2, '0');
}

timerhr.addEventListener("input", () => handleInputChange(timerhr, 23));
timermin.addEventListener("input", () => handleInputChange(timermin, 59));
timersec.addEventListener("input", () => handleInputChange(timersec, 59));


let hours, minutes, seconds, interval;

function start() {
  hours = parseInt(document.getElementById("timerhr").value) || 0;
  minutes = parseInt(document.getElementById("timermin").value) || 0;
  seconds = parseInt(document.getElementById("timersec").value) || 0;
  clearInterval(interval);
  updateDisplay();
  interval = setInterval(updateTimer, 1000);
  document.getElementById("pu").disabled = false;
  document.getElementById("rt").disabled = false;
}

function updateTimer() {
  if (hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(interval);
    alert("Timer expired!");
    document.getElementById("pu").disabled = true;
    document.getElementById("rt").disabled = true;
    document.getElementById("rsm").disabled = true;
    document.getElementById("timerhr").value = "";
  document.getElementById("timermin").value = "";
  document.getElementById("timersec").value = "";
    return;
  } else if (seconds > 0) {
    seconds--;
  } else {
    if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else {
      hours--;
      minutes = 59;
      seconds = 59;
    }
  }

  updateDisplay();
}

function updateDisplay() {
  document.getElementById("tdhr").innerText = formatTime(hours);
  document.getElementById("tdmin").innerText = formatTime(minutes);
  document.getElementById("tdsec").innerText = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

function pause() {
  clearInterval(interval);
  document.getElementById("rsm").disabled = false;
}

function resume() {
  interval = setInterval(updateTimer, 1000);
  document.getElementById("rsm").disabled = true;
}

function reset() {
  clearInterval(interval);
  hours = "0";
  minutes = "0";
  seconds = "0";
  updateDisplay();
  document.getElementById("timerhr").value = "";
  document.getElementById("timermin").value = "";
  document.getElementById("timersec").value = "";
  document.getElementById("pu").disabled = true;
    document.getElementById("rt").disabled = true;
    document.getElementById("rsm").disabled = true;
}
