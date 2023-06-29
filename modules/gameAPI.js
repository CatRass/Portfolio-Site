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

    let companyDetails = "involved_companies.company.name, involved_companies.developer, involved_companies.publisher";
    let categoryFilters = "category !=1 & category !=2 & category !=3  & category !=4 & category != 5 & category != 6 & category != 7  & category !=14 & category !=13 "
    let filters = "& version_parent = null & cover !=null & involved_companies != null & platforms != null & release_dates != null";
    // category = 0 when main game
    // category = 1 when dlc_addon
    // category = 2 when expansion
    // category = 3 when bundle
    // category = 4 when standalone_expansion
    // category = 5 when mod
    // category = 6 when episode
    // category = 7 when season
    // category = 14 when pack
    // category = 14 when update

    const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Client-ID': client_id,
            'Authorization': "Bearer " + await twitchAuth
        },
        body: 'fields name, category, release_dates.human,'+companyDetails+' , platforms.name, cover.image_id; search "'+gameName+'"; where '+categoryFilters+filters+';' 
        
        
    });

    const data = await response.json();
    console.log(data);
    return data;
}