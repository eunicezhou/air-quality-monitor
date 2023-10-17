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
function init(){
    constructOption(cityChoice,searchCity);
    buildupCitySite(1);
}
init();

//獲取縣市id
function getCityId(){
    let cityName = searchCity.value;
    for(let key in cityChoice){
        if(cityChoice[key]=== cityName){
            let id = key
            console.log(id);
            return id
        }
    }
}

//建構獲取資料函式
async function fetchFunction(url){
    let response = await fetch(url);
    let data = response.json();
    return data;
}

//建構區域選項
async function buildupCitySite(id){
    return fetchFunction(`/api/county/${id}`)
    .then(data=>{
        let citySites = {};
        for(let key= 0;key<data.data.length;key++){
            let sitename = data.data[key]['sitename'];
            let siteId = data.data[key]['siteid'];
            citySites[siteId] = sitename;
        }
        searchSite.innerHTML=`<option value="" disabled selected style="display:none;">請選擇</option>`;
        constructOption(citySites,searchSite)
        return citySites;
    })
}

//監聽縣市選擇事件
let cityId;
searchCity.addEventListener('change',()=>{
    cityId = parseInt(getCityId());
    buildupCitySite(cityId)
    return cityId;
})

//獲取縣市空氣汙染資訊
 async function getSitePollutionInfo(){

 }
//監聽區域選擇事件
searchSite.addEventListener('change',()=>{
    let siteName = searchSite.value;
    console.log(cityId);
})
