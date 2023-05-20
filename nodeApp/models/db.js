const mongoose = require("mongoose");
require("./employee.model");
require("./user.model");

mongoose.connect(
  "mongodb://localhost:27017/EmployeeDB",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

require("./employee.model");
require("./user.model");

const Employee = mongoose.model("Employee");

const login = (username, password, callback) => {
  Employee.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error("Failed to find user:", err);
      return callback(err, null);
    }

    callback(null, user);
  });
};

module.exports = {
  login,
};
