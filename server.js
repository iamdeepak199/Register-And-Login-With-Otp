require("dotenv").config();
const express = require("express");
const path = require("path");
const chalk = require("chalk");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRotes");
const otpRoutes = require("./routes/otpRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");

app.use(
  session({
    secret: "secretKey123",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Use true only if using HTTPS
  })
);

// Use routes
app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/", authRoutes);
app.use("/", otpRoutes);
app.use("/", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(
    chalk.green.bold.inverse(`Server is running at http://localhost:${PORT} `)
  );
});
