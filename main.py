from dotenv import load_dotenv
import os
import requests 

load_dotenv()

riot_api = os.getenv('RIOT_API_KEY')
riot_url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Kabir%20Wahid/BIG?api_key=" + riot_api

#/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine} for input of riotID/tagline 
dataObject = requests.get(riot_url)
dataJson = dataObject.json()
puuid = dataJson['puuid']


