require('dotenv').config();
const axios = require('axios');

const riot_api = process.env.RIOT_API_KEY;
const gameName = "Kabir Wahid"
const tagLine = "BIG"


let puuid;  //puuid
let sumid;  //summoner ID
let sdTier; //solo duo tier
let sdRank; //solo duo rank
let sdWins, sdLosses, sdLP; // ranked wins and losses

const riot_url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${riot_api}`;

axios.get(riot_url)
    .then(response => {
        const dataJson = response.data;
        puuid = dataJson['puuid'];


        const sum_id_url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}?api_key=${riot_api}`;

        return axios.get(sum_id_url);
    })
    .then(response => {
        const dataJson = response.data;
        sumid = dataJson['id'];
        rank_url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encodeURIComponent(sumid)}?api_key=${riot_api}`;
        return axios.get(rank_url);
    })
    .then(response => {
        const dataJson = response.data[0];
        sdTier = dataJson['tier'];
        sdRank = dataJson['rank'];
        sdLP = dataJson['leaguePoints']

        sdWins = dataJson['wins'];
        sdLosses = dataJson['losses'];
        
        console.log(sdTier + " " + sdRank + " " + sdLP + "LP")
        console.log(sdWins + "W" + " " + sdLosses + "L" )

    })
    .then(response => {

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


