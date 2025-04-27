const db = require("../db/queries");

async function getIndex(req, res) {
    const games = await db.getAllGames();
    res.render("index", {games});
}

async function getStrategy(req, res) {
    res.render("strategy")
}

async function getAction(req, res) {
    res.render("action")
}

async function getRpg(req, res) {
    res.render("rpg")
}

module.exports = {
    getIndex,
    getStrategy,
    getAction,
    getRpg,
}