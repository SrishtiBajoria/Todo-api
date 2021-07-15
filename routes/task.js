const router = require("express").Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");

// @POST Route
// @DESC Create Task
router.post("/create-task", auth, taskController.createTask);

// @GET Route
// @DESC Get ALl Tasks of logged in User
router.get("/all", auth, taskController.getTasks);

// @PUT Route
// @DESC Update Specific task by ID
router.put("/update-task/:id", auth, taskController.updateTask);

// @DELETE Route
// @DESC Delete Specific Task by ID
router.delete("/delete-task/:id", auth, taskController.deleteTask);
module.exports = router;
