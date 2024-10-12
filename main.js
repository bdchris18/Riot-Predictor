require('dotenv').config(); 
const axios = require('axios');

const riot_api = process.env.RIOT_API_KEY;
const gameName = "Kabir Wahid"
const tagLine = "BIG"

const riot_url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${riot_api}`;

axios.get(riot_url)
    .then(response => {
        const dataJson = response.data;
        const puuid = dataJson['puuid'];
        console.log(puuid);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
