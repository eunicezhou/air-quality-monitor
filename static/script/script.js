const searchCity = document.querySelector('#city');
const searchSite = document.querySelector('#site');
const cityChoice = {1: '臺中市', 2: '苗栗縣', 3: '新竹縣', 
                    4: '屏東縣', 5: '雲林縣', 6: '嘉義縣', 
                    7: '連江縣', 8: '花蓮縣', 9: '基隆市', 
                    10: '南投縣', 11: '嘉義市', 12: '臺南市', 
                    13: '高雄市', 14: '彰化縣', 15: '新北市', 
                    16: '臺北市', 17: '臺東縣', 18: '金門縣', 
                    19: '澎湖縣', 20: '宜蘭縣', 21: '桃園市', 
                    22: '新竹市'}

//建構選項元素
function constructOption(choice,search){
    for(let location in choice){
        let option = document.createElement('option');
        option.textContent = choice[location];
        search.appendChild(option);
    }
}
//頁面載入後初始function
constructOption(cityChoice,searchCity);

//獲取縣市id
function getCityId(){
    let cityName = searchCity.value;
    for(let key in cityChoice){
        if(cityChoice[key]=== cityName){
            let id = key
            return id
        }
    }
}

//建構獲取資料函式
async function fetchFunction(){
    let response = await fetch(`/api/county/${cityId}`);
    let data = response.json();
    return data;
}

//監聽縣市選擇事件
let citySites;
let cityId;
searchCity.addEventListener('change',()=>{
    cityId = parseInt(getCityId());
    fetchFunction()
    .then(data=>{
        citySites = {};
        for(let key= 0;key<data.data.length;key++){
            let sitename = data.data[key]['sitename'];
            let siteId = data.data[key]['siteid'];
            citySites[siteId] = sitename;
        }
        searchSite.innerHTML=`<option value="" disabled selected style="display:none;">請選擇</option>`;
        constructOption(citySites,searchSite)
        return citySites;
    })
})

//監聽區域選擇事件
searchSite.addEventListener('change',()=>{
    let siteName = searchSite.value;
    for(let siteId in citySites){
        if (citySites[`${siteId}`] === siteName){
            fetchFunction(cityId)
            .then(data=>{
                for(let num= 0;num<data.data.length;num++){
                    if(data.data[num]['siteid'] === siteId){
                        console.log(data.data[num]);
                        const AQI = document.querySelector(".aqi")
                        AQI.textContent = data.data[num]['aqi'];
                        const particle = document.querySelector("#pm2_5")
                        particle.textContent = data.data[num]['pm2.5_avg'];
                        const o3 = document.querySelector("#o3");
                        o3.textContent = data.data[num]['o3'];
                        const CO = document.querySelector("#CO");
                        CO.textContent = data.data[num]['co'];
                        const SO2 = document.querySelector("#SO2");
                        SO2.textContent = data.data[num]['so2_avg'];
                        const NO2 = document.querySelector("#NO2");
                        NO2.textContent = data.data[num]['no2'];
                        const location = document.querySelector(".FS2");
                        location.textContent = data.data[num]['county']+data.data[num]['sitename'];
                        const status = document.querySelector(".FS3");
                        status.textContent = data.data[num]['status'];
                        const updateTime = document.querySelector("#updateTime");
                        updateTime.textContent = data.data[num]['publishtime'];
                    }
                }
            })
        }
    }
})
