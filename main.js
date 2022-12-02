window.onload = async function () {
  let originalHTML = document.getElementById("main").innerHTML;
  document.getElementById("main").innerHTML =
    '<div id="loader" class="loader"></div> CARREGANDO DADOS DA API';
  document.getElementById("gamesLine").innerHTML =
    '<div id="loader" class="loader"></div> CARREGANDO DADOS DA API';

  var topGames = await GetTopGames();
  document.getElementById("main").innerHTML = originalHTML;

  await GenerateMainFrame(topGames);
  await GenerateTopGames(topGames);
};

const API_URL = "https://api.rawg.io/api/games";
const API_KEY = "?key=05f1b8976c814b4493de062f5bbade6d";

function GetGamesByParameter(parameter) {
  return fetch(API_URL + API_KEY + parameter, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
}

async function GetTopGames() {
  var response = await GetGamesByParameter("&page_size=9");
  var data = await response.text();
  var json = JSON.parse(data);

  var games = json.results;
  var gamesObjct = [];

  games.forEach((game) => {
    gamesObjct.push({
      name: game.name,
      image: game.background_image,
      rating: game.rating,
      id: game.id,
      realease: game.released,
      genres: game.genres,
      plataforms: game.platforms,
    });
  });

  return gamesObjct;
}

async function GenerateMainFrame(topGames) {
  
  document.getElementById("topGameTitle").innerHTML =
    '<h1 class="GameTitle" onclick="RedirectToGameDetail(' +topGames[0].id +')">' +
    topGames[0].name +
    "</h1>     ";
  document.getElementById("topGameIMG").src = topGames[0].image;
  document.getElementById("TopAbout").innerHTML = "" + topGames[0].rating;

  topGames[0].genres.forEach((genre) => {
    document.getElementById("topGenres").innerHTML += "" + genre.name + ";";
  });
  document.getElementById("topLaunch").innerHTML = "" + topGames[0].realease;
}

function GenerateTopGames(topGames) {
  let str = '<div class="gamesLine">';
  topGames.slice(1).forEach((games) => {
    str +=
      '<div class="games" class="GameTitle" onclick="RedirectToGameDetail(' +games.id +')"> ' +
      '<h1 >' +
      games.name +
      "</h1>     " +
      "<br> " +
      "<br> " +
      ' <img  class="GameIMG" src=' +
      games.image +
      ' width="300px" height="150px"  /img>' +
      "<br> " +
      "<br> " +
      "<b>Data de Lançamento: " +
      games.realease +
      "<br> <b>Nota da Critica: " +
      games.rating +
      "</div>";
  });

  document.getElementById("gamesLine").innerHTML = str + "</div>";
}

function RedirectToGameDetail(gameId) {
  window.location.href = "details.html?gameId=" + gameId;
}
