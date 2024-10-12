from dotenv import load_dotenv
import os
load_dotenv()

riot_api = os.getenv('RIOT_API_KEY')

api_url = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/bdchris18/na1?api_key=RGAPI-d72b6bcb-da6e-47ad-96d0-a36bb776d372"

import requests

requests.get(api_url)

api_url =api_url + '?api_key=' + riot_api

resp = requests.get(api_url)
player_info = resp.json()

print(resp, player_info)



