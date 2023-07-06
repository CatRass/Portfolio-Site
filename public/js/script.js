// import {getLogo} from "./getPlatformLogo.js";
console.log('Javascript is operational')

function addToDB(){
    let reqHeader = new Headers();
    reqHeader.append('Content-Type', 'text/json');
    let initObject = {
        method: 'POST', headers: reqHeader,
    };
    
    fetch('/addToDB', initObject)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
}

function gameSearch(){

    document.body.style.cursor='wait';
    const game = document.getElementById('gameToSearch').value;

    let reqHeader = new Headers();
    reqHeader.append('Content-Type', 'text');
    reqHeader.append('gameName', game)

    let initObject = {
        method: 'POST', headers: reqHeader,
    };
    
    fetch('/getGames', initObject)
        .then(function (response) {
            return response.json();
        })
        .then(function (games) {

            console.log(games);

            $('#gameReviews').html("");

            for (var i=0; i<games.length; i++){
                $('#gameReviews').append(
                    '<div class="game" id="'+i+'"  data-name="'+games[i].name+'" data-releaseDate="'+games[i].release_dates[0].human+'" data-developer="'+getDeveloper(games[i].involved_companies)+'" data-publisher="'+getPublisher(games[i].involved_companies)+'">'+

                        '<p id="gameName">'+
                            games[i].name +
                        '</p>'+

                        '<p class="releaseDate">'+
                                games[i].release_dates[0].human+
                        '</p>'+

                        '<form class="review" onsubmit="getReview('+i+'); return false">'+
                            '<input class="reviewStars" id="reviewStars'+i+'" type=range min="1" max="5" step="1"/>'+
                            '<textarea class="reviewText" id="reviewText'+i+'" placeholder="Your Review..." required=true></textarea>'+
                            '<input class="reviewSubmit" type="submit"/>'+
                        '</form>'+

                        '<div class = "platforms platform'+i+'"></div>'+

                        '<img id="poster'+i+'" src="https://images.igdb.com/igdb/image/upload/t_720p/'+games[i].cover.image_id+'.jpg" class="seamless posterImage">'+

                    '</div>'
                );

                for (var j=0; j<games[i].platforms.length; j++) {
                    
                    let logo = getLogo(games[i].platforms[j].name);

                    if (logo == "404"){
                        $('.platform'+i).append(
                            '<img class="platformLogo" data-plaformName= "'+games[i].platforms[j].name+'" alt = "'+games[i].platforms[j].name+'"  src="https://images.igdb.com/igdb/image/upload/t_micro/'+games[i].platforms[j].versions[0].platform_logo.image_id+'.png" class="platformIcon">'
                        )
                    } else {
                        $('.platform'+i).append(
                            '<img class="platformLogo" data-plaformName= "'+games[i].platforms[j].name+'" alt = "'+games[i].platforms[j].name+'"  src="./images/platforms/'+logo+'.svg" class="platformIcon">'
                        )
                    }
                };

            }
        
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        })
        .then( function(){
            document.body.style.cursor='auto';
        });

}

function getLogo(platformList)
{
    let platformVar;
    switch(platformList) {
    
        case "PC (Microsoft Windows)":
            platformVar = "PC";
            break;
        
        case "iOS":
        case "Mac":
            platformVar = "Mac";
            break;
        case "Linux":
            platformVar = "Linux";
            break;
        
        case "Android":
            platformVar="Android";
            break;
        
        // PS Consoles
        case "PlayStation":
        case "PlayStation 2":
        case "PlayStation 3":
        case "PlayStation 4":
        case "PlayStation 5":
            platformVar = "PlayStation"
            break;
        
        // Xbox Consoles
        case "Xbox":
        case "Xbox 360":
        case "Xbox One":
        case "Xbox Series X|S":
            platformVar="Xbox";
            break;
        
        case "Wii":
            platformVar = "Wii";
            break;

        case "Wii U":
            platformVar="Wii U"
            break;
        
        case "Nintendo Switch":
            platformVar = "Nintendo Switch";
            break;
        
        // Everything unaccounted for
        default:
            platformVar = "404";
            break;
    }
    return platformVar;
    
}

function getDeveloper(involvedCompanies){
    let developer;
    for(let i=0; i<involvedCompanies.length;i++){
        if(involvedCompanies[i].developer){
            developer = involvedCompanies[i].company.name;
        }
    }
    return developer;
}

function getPublisher(involvedCompanies){
    let publisher;
    for(let i=0; i<involvedCompanies.length;i++){
        if(involvedCompanies[i].publisher){
            publisher = involvedCompanies[i].company.name;
        }
    }
    return publisher;
}

function getReview(gameID){
    let gameDetails = document.getElementById(gameID);
    let game = gameDetails.getAttribute('data-name');
    let developer = gameDetails.getAttribute('data-developer');
    let publisher = gameDetails.getAttribute('data-publisher');
    let releaseDate = gameDetails.getAttribute('data-releaseDate');

    let stars = document.getElementById('reviewStars'+gameID).value;
    let review = document.getElementById('reviewText'+gameID).value;
    let posterURL = document.getElementById('poster'+gameID).src;

    console.log("Review Submitted:")
    console.table({"Name":game,"Release Date":releaseDate,"Developer":developer,"Publisher":publisher,"Star Rating":stars,"Review":review,"Poster URL":posterURL})
}