const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "user name must be required"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "email must be required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password must be required"],
     select:false,
  }
});

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;