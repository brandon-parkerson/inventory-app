const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query(`
        SELECT g.id, g.name, g.genre_id, g.developer_id, ge.genre_name, d.developer_name
        FROM games g
        JOIN genre ge ON g.genre_id = ge.id
        JOIN developer d ON g.developer_id = d.id
    `);
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

async function getActionGames() {
    const { rows } = await pool.query("SELECT * FROM games WHERE genre_id = 1");
    return rows;
}

async function getRpgGames() {
    const { rows } = await pool.query("SELECT * FROM games WHERE genre_id = 2");
    return rows;
}

async function getStrategyGames() {
    const {rows} = await pool.query("SELECT * FROM games WHERE genre_id = 3");
    return rows;
}

async function removeGame(gameId) {
    await pool.query(`DELETE FROM games WHERE id = $1`, [gameId]);
}



module.exports = {
    getAllGames,
    addGame,
    getActionGames,
    getRpgGames,
    getStrategyGames,
    removeGame,
  };