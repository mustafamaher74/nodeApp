const mongoose = require("mongoose");
const db = require("./db");

const User = mongoose.model("User");

// Connect to the database
mongoose.connect(
  "mongodb://localhost:27017/EmployeeDB",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.error("Failed to connect to the database:", err);
      process.exit(1);
    }

    // Create a user
    const user = new User({
      username: "admin",
      password: "123",
    });

    // Save the user to the database
    user.save((err) => {
      if (err) {
        console.error("Failed to seed user:", err);
      } else {
        console.log("User seeded successfully.");
      }

      // Disconnect from the database
      mongoose.disconnect();
    });
  }
);
