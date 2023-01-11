const express = require("express");
const controllers = require("../controllers/controller");
const router = express.Router();

router.get("/profile", controllers.getProfile);
router.post("/profile", controllers.editProfile);

router.get("/posts", controllers.getPost);
router.post("/posts", controllers.postPost);

router.get("/subscribe", controllers.getSubscribtions);
router.post("/subscribe", controllers.postSubscribe);

router.post("/subscribe/delete", controllers.deleteSubscriptions);

router.post("/newuser", controllers.addTestUser);

module.exports = router;
