const mongoose = require("mongoose");

var YesDocSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  member_id: {
    type: String
  },
  date_of_birth: {
    type: String
  },
  address: {
    type: String
  },
  employer_name: {
    type: String
  },
  available_credit: {
    type: Number
  },
  original_credit: {
    type: Number
  },
  credit_history: [],
  status: {
    type: String
  }
});

mongoose.model("User", YesDocSchema);