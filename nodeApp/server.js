require("./models/db");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const session = require("express-session");
const { body, validationResult } = require("express-validator");
const db = require("./models/db");
const employeeController = require("./controllers/employeeController");
const { User } = require("./models/user.model");

var app = express();
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("login");
});
app.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log("errors", errors);
    if (!errors.isEmpty()) {
      return res.render("login", { errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username, password });

      if (!user) {
        console.error("Invalid username or password");
        return res.render("login", { error: "Invalid username or password" });
      }

      req.session.userId = user._id;
      res.redirect("employee/list");
    } catch (err) {
      console.error("Failed to perform login:", err);
      res.render("login", {
        error: "An error occurred. Please try again later.",
      });
    }
  }
);

app.use("/employee", employeeController);

app.listen(3000, () => {
  console.log("Express server started at port: 3000");
});
