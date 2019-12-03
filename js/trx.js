
//TRANSACTION DB

function initDB() {
	  //setting the database
	  var dbPromise = idb.open("football-db", 1, function(upgradeDb) {
	    if (!upgradeDb.objectStoreNames.contains("favorites")) {
	      upgradeDb.createObjectStore("favorites");
	      console.log("new-db")

	      var team = upgradeDb.createObjectStore("team", { keyPath: "id" });
	      team.createIndex("name", "name", { unique: false });
	      team.createIndex("image", "image", { unique: false });
	      team.createIndex("playedGames", "playedGames", { unique: false });
	      team.createIndex("win", "win", { unique: false });
	      team.createIndex("draw", "draw", { unique: false });
	      team.createIndex("lose", "lose", { unique: false });
	      team.createIndex("points", "points", { unique: false });
	      team.createIndex("position", "position", { unique: false });
	      team.createIndex("created", "created", { unique: false });
	    } else{
	      console.log("old-db")
	    }
	  });
	  return dbPromise;
}

function addDB(dbPromise, id, callback) {
	dbPromise.then(function(db) {
    var listTeams = JSON.parse(sessionStorage.getItem("listTeams"));
		var team = listTeams.standings[0].table.find(function(data) {
			return data.team.id == id
		})
		console.log(team)
        var tx = db.transaction('team', 'readwrite');
        var store = tx.objectStore('team');
        var item = {
            id: team.team.id,
            name: team.team.name,
            image: team.team.crestUrl,
            playedGames: team.playedGames,
            win: team.win,
            draw: team.draw,
            lose: team.lost,
            points: team.points,
            position: team.position,
            created: new Date().getTime()
        };
        store.add(item); //menambahkan key "buku"
        return tx.complete;
    }).then(function() {
        console.log('Buku berhasil disimpan.');
        callback(true)
    }).catch(function(e) {
        console.log('Buku gagal disimpan: '+ e)
        callback(false)
    })
}

function getAllDB(dbPromise, callback) {
	dbPromise.then(function(db) {
      var tx = db.transaction('team', 'readonly');
      var store = tx.objectStore('team');
      return store.getAll();
    }).then(function(items) {
      callback(items)
    }).catch(function(e) {
      callback(null)
    });
}

function getDB(dbPromise, id, callback) {
	dbPromise.then(function(db) {
      var tx = db.transaction('team', 'readonly');
      var store = tx.objectStore('team');
      return store.get(id); 
    }).then(function(val) {
      callback(val)
    }).catch(function(e) {
      callback(null)
    });
}

function editDB(dbPromise) {
	// dbPromise.then(function(db) {
    //         var tx = db.transaction('buku', 'readwrite');
    //         var store = tx.objectStore('buku');
    //         var item = {
    //             judul: 'Menjadi Android Developer Expert (MADE)',
    //             isbn: 123456789,
    //             description: 'Belajar pemrograman Android di Dicoding dengan modul online dan buku.',
    //             created: new Date().getTime()
    //         };
    //         store.put(item, 123456789); //menambahkan KEY
    //         return tx.complete;
    //     }).then(function() {
    //         console.log('Buku berhasil disimpan.');
    //     }).catch(function() {
    //         console.error('Buku gagal disimpan.')
    //     })
}

function deleteDB(dbPromise, id, callback) {
	dbPromise.then(function(db) {
      var tx = db.transaction('team', 'readwrite');
      var store = tx.objectStore('team');
      store.delete(id);
      return tx.complete;
    }).then(function() {
      console.log('Item success deleted');
      callback(true)
    }).catch(function(e) {
        console.log('Item failed deleted: '+ e)
        callback(false)
    });
}