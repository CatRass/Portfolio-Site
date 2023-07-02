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

                        '<div class = "platforms platform'+i+'"></div>'+

                        '<img src="https://images.igdb.com/igdb/image/upload/t_720p/'+games[i].cover.image_id+'.jpg" class="seamless posterImage">'+

                    '</div>'
                );

                for (var j=0; j<games[i].platforms.length; j++) {

                    $('.platform'+i).append(
                            '<img data-plaformName= "'+games[i].platforms[j].name+'" src="https://images.igdb.com/igdb/image/upload/t_thumb/'+games[i].platforms[j].versions[0].platform_logo.image_id+'.jpg" class="platformIcon">'
                    )
                };

            }
            


            console.log(games);
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        })
        .then( function(){
            document.body.style.cursor='auto';
        });

        
}