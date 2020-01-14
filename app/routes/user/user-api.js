const express   = require("express");
const router    = express.Router();
const mongoose  = require("mongoose");
const UserTable = mongoose.model("User");
const util      = require("../../lib/util/util");
const moment    = require("moment");

/*

{ 
  "name" : "Justin", 
  "email" : "justin.yesdoc123@gmail.com", 
  "member_id" : "YD000001", 
  "date_of_birth" : "1997-03-16", 
  "address" : "No.7, 13 Street, Latha Township, Yangon", 
  "employer_name" : "Yes Doc", 
  "available_credit" : 500, 
  "original_credit" : 500, 
  "credit_history": [],
  "status" : "active" 
}

router.post('/create', async(req, res) => {
  let userData              = new UserTable();
  userData.name             = req.body.name;
  userData.email            = req.body.email;
  userData.member_id        = req.body.member_id;
  userData.date_of_birth    = req.body.date_of_birth;
  userData.address          = req.body.address;
  userData.employer_name    = req.body.employer_name;
  userData.available_credit = req.body.available_credit;
  userData.original_credit  = req.body.original_credit;
  userData.credit_history   = req.body.credit_history;
  userData.status           = "active";

  userData.save((err, docs) => {
    if(!err){
      res.json({
        code: 200,
        message: "Success"
      });
    }else{
      res.json({
        code: 500,
        data: err,
        message: "Error in retrieving user info creation."
      });
    } 
  });
});
*/

router.get("/get-user", function(req, res){

  let email = req.query.email;

  if( (email != "") || (!util.emailValidation(email)) ){
  
    let myQuery      = { email: email, status: "active" };
    let myProjection = { _id: 1, name: 1, available_credit: 1 };

    UserTable.findOne( myQuery, myProjection, function(error, result){
      if( !error ){
        if( result != null )
          res.status(200).send(util.returnResult(true, "The user account has already existed!", result));
        else 
          res.status(204).send(util.returnResult(false, "The user account has not existed!"));
      }else{
        res.status(500).send(util.returnResult(false, "Internal Server Error!", error))
      }
    });
  }else{
    res.status(400).send(util.returnResult(false, "The required parameter is missing!"))
  }
});

router.get("/get-user-data", function(req, res){

  let id = req.query.id;

  if( id != "" ){
  
    let myQuery      = { _id: id, status: "active" };
    let myProjection = { member_id: 1, name: 1, address: 1, date_of_birth: 1, employer_name: 1, _id: 0 };

    UserTable.findOne( myQuery, myProjection, function(error, result){
      if( !error ){
        if( result != null )
          res.status(200).send(util.returnResult(true, "Your information has been successfully retrieved!", result));
        else 
          res.status(204).send(util.returnResult(false, "No more information!"));
      }else{
        res.status(500).send(util.returnResult(false, "Internal Server Error!", error));
      }
    });
  }else{
    res.status(400).send(util.returnResult(false, "The required parameter is missing!"))
  }
});

router.post("/update-credit", async function(req, res){
  let credit            = req.body;
  let requiredProperty  = ["id", "available_credit", "used_credit", "date"];
  let missingValue      = await util.checkJson(requiredProperty, credit);

  if( missingValue.length > 0 ){
    res.status(400).send(util.returnResult(false, missingValue + " is/are missing from provided body."));
  }else{
    if( parseInt(credit.available_credit) >= parseInt(credit.used_credit) ){

      if( ( moment(credit.date, 'YYYY-MM-DD', true).isValid() ) == true ){
        let remaining_credit       = parseInt(credit.available_credit - credit.used_credit);
        credit["remaining_credit"] = remaining_credit; 

        let myQuery      = { _id: credit.id, status: "active" };
        let myUpdate     = {
          available_credit: credit.available_credit,
          used_credit: credit.used_credit,
          remaining_credit: credit.remaining_credit,
          date: new Date(credit.date)
        };
        
        UserTable.updateOne(
          myQuery,
          {
            $addToSet: { credit_history: myUpdate },
            $set: {available_credit: credit.remaining_credit}
          },
          function(error, result){
            if( !error ){
              res.status(200).send(util.returnResult(true, "Successfully Updated!", credit.remaining_credit));
            }else{
              res.status(500).send(util.returnResult(false, "Internal Server Error!", error))
            }
          }
        );
      }else{
        res.status(417).send(util.returnResult(false, "Your date format should be YYYY-MM-DD."));
      }
    }else{
      res.status(417).send(util.returnResult(false, "The credit score which you use is greater than your balance!"));
    }
  }
});

module.exports = router;