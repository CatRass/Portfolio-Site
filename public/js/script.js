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

            $('#gameReviews').html("");

            for (var i=0; i<games.length; i++){
                $('#gameReviews').append(
                    '<div class="game">'+

                        '<p class="name" name="name">'+
                            '<data name="gameName" value= "'+games[i].name+'">'+
                            games[i].name +
                            '</data>'+
                        '</p>'+

                        '<p class="releaseDate">'+
                            '<data name="releaseDate" value="'+games[i].release_dates[0].human+'">'+
                                games[i].release_dates[0].human+
                            '</data>'+
                        '</p>'+

                        '<div class = "platforms'+i+'"></div>'+

                        '<img src="https://images.igdb.com/igdb/image/upload/t_720p/'+games[i].cover.image_id+'.jpg" class="seamless posterImage">'+

                    '</div>'
                );

                for (var j=0; j<games[i].platforms.length; j++) {

                    $('.platforms'+i).append(
                        
                        '<p class = "platformName">'+
                            '<data name="platform" value = "'+games[i].platforms[j].name+', '+'">'+
                                games[i].platforms[j].name + " " +
                            '</data>'+
                        '</p>'
                    )
                };

            }
            


            console.log(games);
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
}