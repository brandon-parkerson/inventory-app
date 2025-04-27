const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", usersController.getIndex);
usersRouter.get("/rpg", usersController.getRpg);
usersRouter.get("/strategy", usersController.getStrategy);
usersRouter.get("/action", usersController.getAction);
usersRouter.get("/new", usersController.getNew);

usersRouter.post("/new", usersController.storeGame);

module.exports = usersRouter;