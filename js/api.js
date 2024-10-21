
//API CALL METHODS

var base_url = "https://api.football-data.org/v4/";
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
function json(response) {
  return response.json();
}
function error(error) {
  console.log("Error : " + error);
}

//================================

function getTeams() {
  //if by caches
  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/standings").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          console.log(data)
          setListCardTeam(data)
          checkAllFavorite(data)
          sessionStorage.setItem("listTeams", JSON.stringify(data));
        });
      }
    });
  }

  //if by network
  const myHeaders = new Headers();
  myHeaders.append('X-Auth-Token', '2917cc7afe38408a8ede7f3d25418376');
  fetch(base_url + "competitions/2021/standings", {
    mode: 'no-cors',
    method: 'GET',
    headers: myHeaders,
  })
  .then(status)
  .then(json)
  .then(function(data) {
    console.log(data.standings[0].table)
    setListCardTeam(data)
    checkAllFavorite(data)
    sessionStorage.setItem("listTeams", JSON.stringify(data));
  })
  .catch(error);
}

function getFavorites() {
  var db = initDB()
  getAllDB(db, function(list) {
    if(list) {
      setListCardTeamByFavorites(list)
    }
  });
}

function getTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  //if by caches
  if ("caches" in window) {
    caches.match(base_url + "teams/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          // Objek JavaScript dari response.json() masuk lewat variabel data.
          console.log(data);
          setItemCardTeam(data)
        });
      }
    });
  } 

  //if by network
  const myHeaders = new Headers();
  myHeaders.append('X-Auth-Token', '2917cc7afe38408a8ede7f3d25418376');
  fetch(base_url + "teams/" + idParam, {
      method: 'GET',
      headers: myHeaders,
    })
    .then(status)
    .then(json)
    .then(function(data) {
      setItemCardTeam(data)
    });
}

function getMatchByTeam() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  //if by caches (teams/{id_tim}/matches?status=SCHEDULED)
  if ("caches" in window) {
    caches.match(base_url + "teams/" + idParam + "/matches?status=SCHEDULED").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          setMatchCardTeam(data)
        });
      }
    });
  } 

  //if by network (teams/{id_tim}/matches?status=SCHEDULED)
  const myHeaders = new Headers();
  myHeaders.append('X-Auth-Token', '2917cc7afe38408a8ede7f3d25418376');
  fetch(base_url + "teams/" + idParam + "/matches?status=SCHEDULED", {
      method: 'GET',
      headers: myHeaders,
    })
    .then(status)
    .then(json)
    .then(function(data) {
      setMatchCardTeam(data)
    });
}