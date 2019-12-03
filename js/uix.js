
//USER INTERFACE

function checkAllFavorite(data) {
  var db = initDB()
  const list = data.standings[0].table
  list.forEach(function(item, index) {
    getDB(db, item.team.id, function(fav) {
      if(fav) {
        document.getElementById("icon-heart-"+fav.id).style.color = 'red'
      }
    })
  })
}

function saveFavorite(id) {
  var db = initDB()
  getDB(db, id, function(item) {
    if(item) {
      deleteDB(db, id, function(callback) {
        if(callback) document.getElementById("icon-heart-"+id).style.color = 'lightgrey'
      })
    } else{
      addDB(db, id, function(callback) {
        if(callback) document.getElementById("icon-heart-"+id).style.color = 'red'
      })
    }
  })
}

function setListCardTeam(data) {
	var dataHTML = "";
  	data.standings[0].table.forEach(function(team) {
		var imageOld = team.team.crestUrl;
  		var imageNew = imageOld.replace(/^http:\/\//i, 'https://'); 
		dataHTML += `
		<div class="col s6 m4 l3">
		  <div class="card">
		    <a href="./team.html?id=${team.team.id}">
		      <div class="card-image waves-effect waves-block waves-light" style="max-height: 175px;">
			<img src="${imageNew}" />
		      </div>
		    </a>
		    <i id="icon-heart-${team.team.id}" class="fa fa-heart icon-heart right" onClick="saveFavorite(${team.team.id})"></i>
		    <div class="card-content">
		      <span class="card-title truncate">${team.team.name}</span>
		      <li>played games: ${team.playedGames}</li>
		      <li>won: ${team.won}</li>
		      <li>draw: ${team.draw}</li>
		      <li>lost: ${team.lost}</li>
		      <li>points: ${team.points}</li>
		      <li>position: ${team.position}</li>
		    </div>
		  </div>
	      </div>
	      `;
  	});
  	document.getElementById("body-content").innerHTML = dataHTML;
}

function setListCardTeamByFavorites(data) {
  var dataHTML = "";
    data.forEach(function(team) {
	var imageOld = team.image;
  	var imageNew = imageOld.replace(/^http:\/\//i, 'https://'); 
      dataHTML += `
      <div class="col s6 m4 l3">
          <div class="card">
            <a href="./team.html?id=${team.id}">
              <div class="card-image waves-effect waves-block waves-light" style="max-height: 175px;">
                <img src="${imageNew}" />
              </div>
            </a>
            <div class="card-content">
              <span class="card-title truncate">${team.name}</span>
              <li>played games: ${team.playedGames}</li>
              <li>won: ${team.won}</li>
              <li>draw: ${team.draw}</li>
              <li>lost: ${team.lost}</li>
              <li>points: ${team.points}</li>
              <li>position: ${team.position}</li>
            </div>
          </div>
      </div>
      `;
    });
    document.getElementById("body-content").innerHTML = dataHTML;
}

function setMatchCardTeam(data) {
  var dataHTML = "";
  data.matches.forEach(function(play) {
    dataHTML += `
      <tr>
        <td>${play.homeTeam.name}</td>
        <td><b>VS</b></td>
        <td>${play.awayTeam.name}</td>
      </tr>
    `;
  });
  document.getElementById("child-content").innerHTML = dataHTML;
}

function setItemCardTeam(data) {
  var date = new Date();
  var year = date.getFullYear();
  var next = year + 1

  var imageOld = data.crestUrl;
  var imageNew = imageOld.replace(/^http:\/\//i, 'https://'); 
  
  var dataHTML = `
  <div class="row">
    <div class="col s5 m4 l3">
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${imageNew}" />
        </div>
        <div class="card-content">
          <span class="card-title"><b>${data.shortName}</b></span>
          <i>${snarkdown(data.address)}</i>
        </div>
      </div>
    </div>
    <div class="col s7 m8 l9">
      <div class="card">
        <div class="card-content">
          <li><b>name    : </b>${data.name}</li>
          <li><b>phone   : </b>${data.phone}</li>
          <li><b>website : </b>${data.website}</li>
          <li><b>email   : </b>${data.email}</li>
          <li><b>founded : </b>${data.founded}</li>
          <li><b>colors  : </b>${data.clubColors}</li>
          <li><b>venue   : </b>${data.venue}</li>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <table class="responsive-table">
            <thead>
              <tr>
                  <th>Home</th>
                  <th><b>match</b> (${year}-${next})</th>
                  <th>Away</th>
              </tr>
            </thead>
            <tbody id="child-content"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  `;
  document.getElementById("body-content").innerHTML = dataHTML;
  getMatchByTeam()
}
