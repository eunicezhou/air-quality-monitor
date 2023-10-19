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
    if (targetNumber >= 40) {
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
  }, 10);
};

const calculateStrokeDashoffset = (aqiNumber) => {
  return 472 * (1 - aqiNumber / 500);
};

let updateGradientColor = (aqiNumber) => {
  const controlCircle = document.querySelector(".control-circle");
  const greenStop = document.getElementById("green-stop");
  const redStop = document.getElementById("red-stop");

  const percentage = (aqiNumber / 500) * 100;
  const color = getColorForPercentage(aqiNumber);
  greenStop.setAttribute("stop-color", color);
  redStop.setAttribute("stop-color", color);

  const gradient = `url(#GradientColor ${percentage}%, ${color} 100%)`;
  controlCircle.style.stroke = gradient;
};

let getColorForPercentage = (aqiNumber) => {
  if (aqiNumber <= 25) {
    return "#98D8AA";
  } else if (aqiNumber <= 50) {
    return "#F3E99F";
  } else if (aqiNumber <= 75) {
    return "#F7D060";
  } else {
    return "#FF6D60";
  }
};

let updateBackgroundImage = (airQuality) => {
  const main = document.querySelector(".main");

  if (airQuality >= 0 && airQuality <= 50) {
    main.style.backgroundImage = 'url("/static/images/fresh.jpg")';
  } else if (airQuality > 50 && airQuality <= 100) {
    main.style.backgroundImage = 'url("/static/images/ok.jpg")';
  } else if (airQuality > 100 && airQuality <= 150) {
    main.style.backgroundImage = 'url("/static/images/notok.jpg")';
  } else {
    main.style.backgroundImage = 'url("/static/images/pollution.jpg")';
  }
};
