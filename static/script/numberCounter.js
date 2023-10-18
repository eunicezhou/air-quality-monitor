const aqiNumber = document.getElementById("aqi-number");
const pm25Data = document.getElementById("pm25-data");

const updateAqiAndCircle = (targetNumber, element) => {
  const controlCircle = document.querySelector(".control-circle");

  if (isNaN(targetNumber)) {
    targetNumber = 0;
  }

  let counter = 0;
  const intervalId = setInterval(() => {
    if (counter >= targetNumber) {
      clearInterval(intervalId);
    }
    if (targetNumber >= 50) {
      element.textContent = counter;
      counter += 1;

      const dashoffset = calculateStrokeDashoffset(counter);
      controlCircle.style.setProperty("--dash-offset", dashoffset);
      updateGradientColor(counter);
    } else {
      let dotNumber = counter;
      element.textContent = dotNumber.toFixed(2);
      counter += 0.1;
    }
  }, 1);
};

const calculateStrokeDashoffset = (aqiNumber) => {
  return 472 * (1 - aqiNumber / 500);
};

let updateGradientColor = (aqiNumber) => {
  const controlCircle = document.querySelector(".control-circle");
  const greenStop = document.getElementById("green-stop");
  const redStop = document.getElementById("red-stop");

  const percentage = (aqiNumber / 500) * 100;
  const color = getColorForPercentage(percentage);
  greenStop.setAttribute("stop-color", color);
  redStop.setAttribute("stop-color", color);

  const gradient = `url(#GradientColor ${percentage}%, ${color} 100%)`;
  controlCircle.style.stroke = gradient;
};

let getColorForPercentage = (percentage) => {
  if (percentage <= 25) {
    return "#98D8AA";
  } else if (percentage <= 50) {
    return "#F3E99F";
  } else if (percentage <= 75) {
    return "#F7D060";
  } else {
    return "#FF6D60";
  }
};
