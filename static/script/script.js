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

//建構縣市選項
function init(){
    constructOption(cityChoice,searchCity);
}
init();

//獲取所選擇的縣市id
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
        
//         let responseDict = {
//             'country': response['country'],
//             'sitename': response['sitename'],
//             'latitude': response['latitude'],
//             'longitude': response['longitude'],
//             'AQI': response['aqi'],
//             'status': response['status'],
//             'pollutant': response['pollutant'],
//             'o3_8hours': response['o3_8hr'],
//             'particle2_5': response['pm2.5'],
//             'publishtime': response['publishtime'],
//             'so2': response['so2'],
//             'co': response['co'],
//             'o3': response['o3']
//         }
//         return responseDict;
//     })
// }

//建構獲取資料函式
async function fetchFunction(url){
    let response = await fetch(url);
    let data = response.json();
    return data;
}

searchCity.addEventListener('change',()=>{
    let cityId = parseInt(getCityId());
    fetchFunction(`/api/sites/${cityId}`)
    constructOption(choice,search)
})