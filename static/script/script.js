const searchCity = document.getElementById("city");
const searchSite = document.getElementById("site");
const chooseSite = document.querySelector(".site-selected");

const cityChoice = {
  9: "基隆市",
  16: "臺北市",
  15: "新北市",
  21: "桃園市",
  3: "新竹縣",
  22: "新竹市",
  2: "苗栗縣",
  1: "臺中市",
  14: "彰化縣",
  5: "雲林縣",
  10: "南投縣",
  6: "嘉義縣",
  11: "嘉義市",
  12: "臺南市",
  13: "高雄市",
  4: "屏東縣",
  17: "臺東縣",
  8: "花蓮縣",
  20: "宜蘭縣",
  7: "連江縣",
  18: "金門縣",
  19: "澎湖縣",
};

let cityId;
let citySitesResult;

//建構選項元素
function constructCityOption(choice, search) {
  for (let key in choice) {
    let optionLi = document.createElement("li");
    optionLi.textContent = choice[key];

    if (choice[key] === "臺北市") {
      optionLi.classList.add("active");
    }

    search.appendChild(optionLi);
  }
}

//監聽縣市選擇事件
searchCity.addEventListener("click", async () => {
  cityId = parseInt(getCityId());
  citySitesResult = await fetchFunction().then((data) => {
    searchSite.innerHTML = "";
    chooseSite.innerHTML = "Choose a site!";
    let citySites = {};
    for (let key = 0; key < data.data.length; key++) {
      let sitename = data.data[key]["sitename"];
      let siteInfo = data.data[key];
      citySites[sitename] = siteInfo;
    }
    constructSiteOption(citySites, searchSite);
    console.log(citySites);
    return citySites;
  });
});

function constructSiteOption(citySites, search) {
  for (let key in citySites) {
    let optionLi = document.createElement("li");
    optionLi.textContent = key;

    if (key === "中山") {
      optionLi.classList.add("active");
    }
    search.appendChild(optionLi);
    setupSiteOptions();
  }
}

//獲取縣市id
function getCityId() {
  const selectedOption = searchCity.querySelector("li.active");
  const cityName = selectedOption.textContent;
  if (cityName) {
    for (let key in cityChoice) {
      if (cityChoice[key] === cityName) {
        return key;
      }
    }
  }
  return null;
}

//建構獲取資料函式
function fetchFunction() {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`/api/county/${cityId}`);
      let data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

let updateSiteInfo = (siteInfors, siteName) => {
  for (let siteLoca in siteInfors) {
    if (siteLoca === siteName) {
      const siteData = siteInfors[siteLoca];

      updateElement("aqi-number", siteData["aqi"]);
      updateElement("pm2_5", siteData["pm2.5_avg"]);
      updateElement("o3", siteData["o3"]);
      updateElement("CO", siteData["co"]);
      updateElement("SO2", siteData["so2_avg"]);
      updateElement("NO2", siteData["no2"]);

      updateBackgroundImage(siteData["aqi"]);

      const location = document.getElementById("county");
      location.textContent = siteData["county"] + siteData["sitename"];

      const status = document.getElementById("status");
      status.textContent = siteData["status"];

      const updateTime = document.querySelector("#updateTime");
      updateTime.textContent = siteData["publishtime"];
    }
  }
};

let updateElement = (id, value) => {
  const element = document.getElementById(id);
  if (element) {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      updateAqiAndCircle(parsedValue, element);
    }
  }
};

searchSite.addEventListener("click", () => {
  const siteSelected = searchSite.querySelector("li.active");
  const siteName = siteSelected.textContent;
  const siteInfors = citySitesResult;

  updateSiteInfo(siteInfors, siteName);
});

async function initializeApp() {
  constructCityOption(cityChoice, searchCity);
  initOptionsSetup();
  cityId = 16;
  citySitesResult = await fetchFunction();

  const citySites = {};
  for (let key = 0; key < citySitesResult.data.length; key++) {
    let sitename = citySitesResult.data[key]["sitename"];
    let siteInfo = citySitesResult.data[key];
    citySites[sitename] = siteInfo;
  }
  constructSiteOption(citySites, searchSite);

  const firstSiteName = Object.keys(citySites)[1];
  updateSiteInfo(citySites, firstSiteName);
}

const mainView = document.getElementById("main");
mainView.style.display = "none";

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  mainView.style.display = "flex";
  setTimeout(() => {
    console.log("Start");
    initializeApp();
  }, 400);
});
