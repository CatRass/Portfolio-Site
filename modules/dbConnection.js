var sqlite3 = require('sqlite3').verbose();

exports.db = new sqlite3.Database('./database/game-reviews.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the game-reviews database.');
  });