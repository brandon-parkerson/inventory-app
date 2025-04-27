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
    // Check if the genre already exists in the genre table
    const genreResult = await pool.query("SELECT id FROM genre WHERE genre_name = $1", [genre]);

    let genreId;
    if (genreResult.rows.length > 0) {
        // Genre exists, use the existing id
        genreId = genreResult.rows[0].id;
    } else {
        // Genre doesn't exist, so insert it and use the new id
        const insertGenreResult = await pool.query("INSERT INTO genre (genre_name) VALUES ($1) RETURNING id", [genre]);
        genreId = insertGenreResult.rows[0].id;
    }

    // Now insert the developer
    const developerResult = await pool.query("INSERT INTO developer (developer_name) VALUES ($1) RETURNING id", [developer]);
    const developerId = developerResult.rows[0].id;

    // Finally, insert the game
    await pool.query("INSERT INTO games (name, genre_id, developer_id) VALUES ($1, $2, $3)", [name, genreId, developerId]);
}


async function getActionGames() {
    const { rows } = await pool.query(`
        SELECT g.name, g.genre_id, g.developer_id, ge.genre_name, d.developer_name
        FROM games g
        JOIN genre ge ON g.genre_id = ge.id
        JOIN developer d ON g.developer_id = d.id
        WHERE g.genre_id = 2
    `);
    return rows;
}


async function getRpgGames() {
    const { rows } = await pool.query(`
        SELECT g.name, g.genre_id, g.developer_id, ge.genre_name, d.developer_name
        FROM games g
        JOIN genre ge ON g.genre_id = ge.id
        JOIN developer d ON g.developer_id = d.id
        WHERE g.genre_id = 1
        `);
    return rows;
}

async function getStrategyGames() {
    const {rows} = await pool.query(`
        SELECT g.name, g.genre_id, g.developer_id, ge.genre_name, d.developer_name
        FROM games g
        JOIN genre ge ON g.genre_id = ge.id
        JOIN developer d ON g.developer_id = d.id
        WHERE g.genre_id = 3
        `);
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