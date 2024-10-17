require('dotenv').config();
const axios = require('axios');

const riot_api = process.env.RIOT_API_KEY;
const gameName = "Leviatã";
const tagLine = "777";

let puuid, sumid, sdTier, sdRank, sdWins, sdLosses, sdLP;
let matchList, singleMatch, playerList, matchName, matchTag;

const riot_url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${riot_api}`;

// Wait function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Slow down async function
async function slowDown(num) {
    await wait(num * 1000);  // Wait for num seconds
}

// API Executer
async function fetchData() {
    try {
        // Get PUUID
        const response = await axios.get(riot_url);
        const dataJson = response.data;
        puuid = dataJson['puuid'];

        // Get Summoner ID
        const sum_id_url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}?api_key=${riot_api}`;
        const summonerResponse = await axios.get(sum_id_url);
        sumid = summonerResponse.data['id'];

        // Get Rank Info
        const rank_url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encodeURIComponent(sumid)}?api_key=${riot_api}`;
        const rankResponse = await axios.get(rank_url);
        const rankData = rankResponse.data[0];
        sdTier = rankData['tier'];
        sdRank = rankData['rank'];
        sdLP = rankData['leaguePoints'];
        sdWins = rankData['wins'];
        sdLosses = rankData['losses'];

        console.log(sdTier + " " + sdRank + " " + sdLP + "LP");
        console.log(sdWins + "W " + sdLosses + "L");

        // Get Match List
        const match_url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids?start=0&count=20&api_key=${riot_api}`;
        const matchResponse = await axios.get(match_url);
        matchList = matchResponse.data;

        for (let j = 0; j < 4; j++) {
            singleMatch = matchList[j];
            const single_Match_URL = `https://americas.api.riotgames.com/lol/match/v5/matches/${encodeURIComponent(singleMatch)}?api_key=${riot_api}`;
            const singleMatchResponse = await axios.get(single_Match_URL);
            playerList = singleMatchResponse.data['metadata']['participants'];

            console.log("\n\nGame " + (j + 1));

            for (let i = 0; i < playerList.length; i++) {
                const iterativePuuid = playerList[i];
                const account_Retrival_URL = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${encodeURIComponent(iterativePuuid)}?api_key=${riot_api}`;
                const accountResponse = await axios.get(account_Retrival_URL);
                const accountData = accountResponse.data;
                matchName = accountData['gameName'];
                matchTag = accountData['tagLine'];
                if (i == 0) {
                    console.log("\nBlue Team:")
                }
                if (i == 5) {
                    console.log("\nRed Team:")
                }
                console.log(matchName + "#" + matchTag);

            }

            await slowDown(2); // Slow down loop
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


fetchData();
