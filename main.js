require('dotenv').config();
const axios = require('axios');

const riot_api = process.env.RIOT_API_KEY;
const gameName = "Sirflash4"
const tagLine = "na1"


let puuid, sumid, sdTier, sdRank, sdWins, sdLosses, sdLP; // Player Identification and Ranked Stats
let singleMatch, playerList, matchName, matchTag; //Match Variables
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
        console.log(sdWins + "W" + " " + sdLosses + "L")

        const match_url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids?start=0&count=20&api_key=${riot_api}`;
        return axios.get(match_url);
    })
    .then(response => {
        const dataJson = response.data;
        singleMatch = response.data[0]; //this will be a matchList
        singleMatch = dataJson[0];
        const single_Match_URL = `https://americas.api.riotgames.com/lol/match/v5/matches/${encodeURIComponent(singleMatch)}?api_key=${riot_api}`
        return axios.get(single_Match_URL); //gets data about a single match
    })
    .then(response => {
        const dataJson = response.data;
        playerList = dataJson['metadata']['participants'];

        for (let i = 0; i < playerList.length; i++) {
            iterativePuuid = playerList[i];
            const account_Retrival_URL = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${encodeURIComponent(iterativePuuid)}?api_key=${riot_api}`;
            axios.get(account_Retrival_URL)
                .then(response => {
                    const dataJson = response.data;
                    matchName = dataJson['gameName'];
                    matchTag = dataJson['tagLine'];
                    console.log(matchName + "#" + matchTag)
                })
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


