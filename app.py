from flask import Flask, jsonify
from flask import *
import requests
# import mysql.connector.pooling

app = Flask(__name__, static_url_path='/static', static_folder='static')

app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

# Create a connection pool
# db_config = {}
# connection_pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **db_config)

# Step 2: Write a Route to Fetch Data
@app.route('/api/site/<int:site_id>', methods=['GET'])
def fetch_data(site_id):
    api_url = 'https://data.moenv.gov.tw/api/v2/aqx_p_432'
    api_key = 'b0943a5c-9874-481b-83aa-f710549515a1'

    params = {
        'api_key': api_key
    }

    response = requests.get(api_url, params=params)
    # print(response.text)

    if response.status_code == 200:
        data = response.json()
        data_onesite = data['records'][site_id]
        print(data)
        data_formatted = {'data': data_onesite}
        return jsonify(data_formatted)
    else:
        return jsonify({'error': 'Failed to fetch data'}), 500

dict_county = {1: '臺中市', 2: '苗栗縣', 3: '新竹縣', 
                4: '屏東縣', 5: '雲林縣', 6: '嘉義縣', 
                7: '連江縣', 8: '花蓮縣', 9: '基隆市', 
                10: '南投縣', 11: '嘉義市', 12: '臺南市', 
                13: '高雄市', 14: '彰化縣', 15: '新北市', 
                16: '臺北市', 17: '臺東縣', 18: '金門縣', 
                19: '澎湖縣', 20: '宜蘭縣', 21: '桃園市', 
                22: '新竹市'}

@app.route('/api/sites/<int:county_id>', methods=['GET'])
def fetch_data_all(county_id):
    api_url = 'https://data.moenv.gov.tw/api/v2/aqx_p_432'
    api_key = 'b0943a5c-9874-481b-83aa-f710549515a1'

    params = {
        'api_key': api_key
    }

    response = requests.get(api_url, params=params)

    if response.status_code == 200:
        data_county = []
        data = response.json()
        data = data['records']
        
        # data_func = create_county_dict(data)
        # print(data_func)
        
        for index in range(len(data)):
            if data[index]['county'] == dict_county[county_id]:
                data_county.append(data[index])
        
        data_formatted = {"data": data_county}
        return jsonify(data_formatted)
    else:
        return jsonify({'error': 'Failed to fetch data'}), 500

def create_county_dict(data):
    data_list = set()
    for index in range(len(data)):  
        data_list.add(data[index]['county'])
    
    data_dict = {}
    for index, value in enumerate(data_list, start=1):
        data_dict[index] = value
    # print(data_dict)
    return data_dict
    
## Step 3: Implement Periodic Task (no need to do this part to update database)
# from apscheduler.schedulers.background import BackgroundScheduler

# def scheduled_task():
#     with app.app_context():
#         # fetch_data()
#         pass

# scheduler = BackgroundScheduler()
# scheduler.add_job(scheduled_task, 'interval', hours=1)
# scheduler.start()

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=2000, debug=True)
