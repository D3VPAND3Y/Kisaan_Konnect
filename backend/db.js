const mongoose = require("mongoose");

const dbConnect = mongoose
  .connect(
    "mongodb+srv://ayush123:ayush123@cluster0.kpwm74z.mongodb.net/Kisaan_DB",
  )
  .then((val, err) => {
    if (err) throw err;
    console.log("Connected to db");
  });


module.exports = {
  dbConnect,
};