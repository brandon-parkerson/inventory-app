const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query("SELECT * FROM games");
    return rows;
}

async function addGame(name, genre, developer) {
    const genreResult = await pool.query("INSERT INTO genre (genre_name) VALUES ($1) RETURNING id", [genre]);
    // genre id
    const genreId = genreResult.rows[0].id;

    const developerResult = await pool.query("INSERT INTO developer (developer_name) VALUES ($1) RETURNING id", [developer]);
    // developer id
    const developerId = developerResult.rows[0].id;

    await pool.query("INSERT INTO games (name, genre_id, developer_id) VALUES ($1, $2, $3)", [name, genreId, developerId]);
    
}

module.exports = {
    getAllGames,
    addGame
  };