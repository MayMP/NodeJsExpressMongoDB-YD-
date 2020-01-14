const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser");
const http		    = require("http");
const db          = require("./app/db/db");
const util        = require("./app/lib/util/util");
const path        = require('path');
const env         = process.env.NODE_ENV || "development";
const config      = require(path.join(__dirname, '.', 'app', 'config', 'config.json'))[env];
const port 		    = 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, api-key");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
  next();
});

/** 
 * To secure API keys
 */
app.all( "*", function(req, res, next){
  var apiKey = req.header("api-key");
  if( !apiKey ){
    res.send(util.returnResult(false, "Missing API Key, please include API Key in your request header"));
  }else if( apiKey !== config.admin_access_token_key ){
    res.send(util.returnResult(false, "Invalid API Key!"));
  }else{
    next();
  }
});

//Routes
app.use(require("./app/routes/"));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Render the error page
  return res.status(err.status || 500).send({success:false,status: err.status || 500, error:err.message});
});

const server  = http.Server(app);

server.listen(port, function(err){
  if(!err)
    console.log("Listening on port " + port);
  else console.log(err)
});

module.exports = app;