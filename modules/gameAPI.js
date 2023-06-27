exports.fetch = require('node-fetch');

// Docs: https://api-docs.igdb.com/?javascript
exports.getTwitchAccessToken = async function (client_id, client_secret){

    const response = await fetch('https://id.twitch.tv/oauth2/token?client_id='+client_id+'&client_secret='+client_secret+'&grant_type=client_credentials', {
        method: 'post',
    });

    const data = await response.json();
    console.log(data['access_token']);
    return data['access_token'];
    
}

exports.getGaming = async function (twitchAuth, client_id, gameName){

    let filters = "category != 5 & category = 0 & version_parent = null & cover !=null";
    // category = 5 when mod
    // category = 0 when main game

    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Client-ID': client_id,
            'Authorization': "Bearer " + await twitchAuth
        },
        body: 'fields name, involved_companies, platforms.name, cover.image_id; search "'+gameName+'"; where '+filters+';' 
        
        
    });

    const data = await response.json();
    console.log(data);
    return data;
}