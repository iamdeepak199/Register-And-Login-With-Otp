require("dotenv").config();
const express = require("express");
const path = require("path");
const chalk = require("chalk");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRotes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");

// Session config
app.use(session({
    secret: "secretKey123",
    resave: false,
    saveUninitialized: true,
}));


// Use routes
app.use("/", authRoutes);
app.use("/", dashboardRoutes);


// Start server
app.listen(PORT, () => {
    console.log(chalk.green.bold.inverse(`Server is running at http://localhost:${PORT} `));
});
