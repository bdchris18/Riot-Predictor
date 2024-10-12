from dotenv import load_dotenv
import os
load_dotenv()

riot_api = os.getenv('RIOT_API_KEY')

api_url = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/bdchris18/na1"

import requests

requests.get(api_url)

api_url =api_url + '?api_key=' + riot_api

resp = requests.get(api_url)
player_info = resp.json()
print(resp, player_info)

dataObject = requests.get(api_url)
dataJson = dataObject.json()
puuid = dataJson['puuid']
print(puuid)



