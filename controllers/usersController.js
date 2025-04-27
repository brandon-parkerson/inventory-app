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

async function getNew(req, res) {
    res.render("new");
}

async function storeGame(req, res) {
    const {name, genre, developer} = req.body;
    console.log(name, genre, developer);
    
    await db.addGame(name, genre, developer);
    res.redirect("/");
}

async function deleteGame(req, res) {
    db.removeGame(req.params.id);
    res.redirect("/");
}

module.exports = {
    getIndex,
    getStrategy,
    getAction,
    getRpg,
    storeGame,
    getNew,
    deleteGame,
}