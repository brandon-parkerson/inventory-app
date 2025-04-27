const db = require("../db/queries");

async function getIndex(req, res) {
    const games = await db.getAllGames();
    res.render("index", {games});
}

async function getStrategy(req, res) {
    const games = await db.getStrategyGames();
    res.render("strategy", {games});
}

async function getAction(req, res) {
    const games = await db.getActionGames();
    res.render("action", {games});
}

async function getRpg(req, res) {
    const games = await db.getRpgGames();
    res.render("rpg", {games});
}

module.exports = {
    getIndex,
    getStrategy,
    getAction,
    getRpg,
}