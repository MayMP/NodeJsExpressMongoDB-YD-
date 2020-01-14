var express = require("express");
var router  = express.Router();

// Get home page
router.get("/", function(req, res){
  res.send({ status: 200, msg: "Welcome to MMP API" });
});

/**
 * Import API routes file path here
 */
var userRouter = require("./user/user-api");

router.use("/user", userRouter);

module.exports = router;