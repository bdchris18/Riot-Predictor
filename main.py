from dotenv import load_dotenv
import os
load_dotenv()

riot_api = os.getenv('RIOT_API_KEY')

#/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine} for input of riotID/tagline 
