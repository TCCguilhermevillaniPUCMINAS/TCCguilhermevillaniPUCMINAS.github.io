window.onload = async function () {
    var idFromUrl = window.location.href.split('=').reverse()[0];
    console.log(idFromUrl)

    let originalHTML = document.getElementById('main').innerHTML;
    document.getElementById('main').innerHTML ='<div id="loader" class="loader"></div>CARREGANDO DADOS DA API';
    var game = await GetGameById(idFromUrl);
    console.log(game);  


    document.getElementById('main').innerHTML = originalHTML;
    await GenerateMainFrame(game)
  };
  
  const API_URL = 'https://api.rawg.io/api/games'
  const API_KEY = '?key=05f1b8976c814b4493de062f5bbade6d'
  
  
  function GetRequestGameById(id)
  {
      return fetch(
          API_URL+'/'+id+API_KEY,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
  }
  
  async function GetGameById(id) {
    var response  = await GetRequestGameById(id);
    var data = await response.text();
    var game = JSON.parse(data);  
   
    var gamesObjct = {
        name: game.name,
        image: game.background_image,
        rating: game.rating,
        id: game.id,
        realease: game.released,
        genres : game.genres,
        plataforms: game.platforms,
        description : game.description,
        developers : game.developers

    }  
 
  
    return gamesObjct;
  };  
  
  
  async function GenerateMainFrame(game)
  {
      document.getElementById('Game').innerHTML = game.name
      document.getElementById("topGameIMG").src = game.image;
      document.getElementById('TopAbout').innerHTML = ''+game.rating
  
      game.genres.forEach(genre => {
        document.getElementById('topGenres').innerHTML += ''+genre.name+';'
  
      });

      document.getElementById('topLaunch').innerHTML = ''+game.realease
      document.getElementById('about').innerHTML = game.description 
      document.getElementById('developer').innerHTML = game.developers[0].name 

  }
    
  function RedirectToGameDetail(gameId)
  {
  
    window.location.href = 'details.html?gameId='+gameId
  
  }