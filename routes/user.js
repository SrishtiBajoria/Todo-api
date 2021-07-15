const router = require("express").Router();
const userController = require("../controllers/userController");

// @POST Route
// @DESC User Registeration
router.post("/register", userController.signup);
router.post("/login", userController.signin);

module.exports = router;
