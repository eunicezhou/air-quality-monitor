const searchCity = document.querySelector('#city');
const searchSite = document.querySelector('#site');
const cityChoice = {
    '9': '基隆市', '16': '臺北市', '15': '新北市',
    '21': '桃園市', '3': '新竹縣', '22': '新竹市',
    '2': '苗栗縣','1': '臺中市', '14': '彰化縣', 
    '5': '雲林縣', '10': '南投縣', '6': '嘉義縣', 
    '11': '嘉義市', '12': '臺南市', '13': '高雄市', 
    '4': '屏東縣', '17': '臺東縣', '8': '花蓮縣', 
    '20': '宜蘭縣', '7': '連江縣', '18': '金門縣',
    '19': '澎湖縣'}

//建構選項元素
function constructCityOption(choice, search) {
    for(let key in choice){
        let optionLi = document.createElement('option');
        optionLi.textContent = choice[key];
        search.appendChild(optionLi);
    }
}
function constructSiteOption(choice, search) {
    for (let key in choice) {
        let optionLi = document.createElement('option');
        optionLi.textContent = key;
        search.appendChild(optionLi);
    }
}
//頁面載入後初始function
constructCityOption(cityChoice, searchCity);

//獲取縣市id
function getCityId() {
    let cityName = searchCity.value;
    for (let key in cityChoice) {
        if (cityChoice[key] === cityName) {
            let id = key
            return id
        }
    }
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
let cityId
//監聽縣市選擇事件
// let citySites;
let citySitesResult;
searchCity.addEventListener('change', async() => {
    cityId = parseInt(getCityId());
    citySitesResult = await fetchFunction()
    .then(data => {
            let citySites = {};
            for (let key = 0; key < data.data.length; key++) {
                let sitename = data.data[key]['sitename'];
                let siteInfo = data.data[key];
                citySites[sitename] = siteInfo;
            }
            searchSite.innerHTML = `<option value="" disabled selected style="display:none;">請選擇</option>`;
            constructSiteOption(citySites, searchSite)
            return citySites;
        })
})

//監聽區域選擇事件
searchSite.addEventListener('change', () => {
    let siteName = searchSite.value;
    let siteInfors = citySitesResult;
    for (let siteLoca in siteInfors) {
        console.log(siteInfors);
        if (siteLoca === siteName) {
            const AQI = document.getElementById("aqi-number")
            const AqiData = parseInt(siteInfors[siteLoca]['aqi']);

            const pm25Element = document.querySelector("#pm2_5")
            const pm25Data = parseFloat(siteInfors[siteLoca]['pm2.5_avg']);
        

            const o3Element = document.querySelector("#o3");
            const o3Data = parseFloat(siteInfors[siteLoca]['o3']);

            const coElement = document.querySelector("#CO");
            const coData = parseFloat(siteInfors[siteLoca]['co']);

            const so2Element = document.querySelector("#SO2");
            const so2Data = parseFloat(siteInfors[siteLoca]['so2_avg']);
            
            const no2Element = document.querySelector("#NO2");
            const no2Data = parseFloat(siteInfors[siteLoca]['no2']);
            
            const location = document.getElementById("county");
            location.textContent = siteInfors[siteLoca]['county'] + siteInfors[siteName]['sitename'];

            const status = document.getElementById("status");
            status.textContent = siteInfors[siteLoca]['status'];

            const updateTime = document.querySelector("#updateTime");
            updateTime.textContent = siteInfors[siteLoca]['publishtime'];
            console.log(AqiData,AQI);
            updateAqiAndCircle(AqiData, AQI);
            updateAqiAndCircle(pm25Data, pm25Element);
            updateAqiAndCircle(o3Data, o3Element);
            updateAqiAndCircle(coData, coElement);
            updateAqiAndCircle(so2Data, so2Element);
            updateAqiAndCircle(no2Data, no2Element);
        }
    }
})
