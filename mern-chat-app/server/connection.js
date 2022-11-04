const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/mern-chat-ap", () => {
  console.log("connected to mongodb");
});
