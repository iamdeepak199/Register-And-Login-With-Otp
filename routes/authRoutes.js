const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { db } = require("../Config/DataBase");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET pages
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

// POST register
router.post("/register", upload.single("img"), (req, res) => {
  const { username, email, password, companyname, age, dob } = req.body;
  const img = req.file ? req.file.filename : null;

  const sql = "INSERT INTO users (username, email, password, companyname, age, dob, img) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [username, email, password, companyname, age, dob, img], (err) => {
    if (err) return res.send("Error during registration");
    res.redirect("/login");
  });
});

// POST login
router.post("/login", (req, res) => {
  const { email, password, otp } = req.body;

  if (req.session.email !== email) return res.send("Email mismatch");
  if (req.session.otp !== otp) return res.send("Invalid OTP");

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0) return res.send("Invalid credentials");
    const user = results[0];

    if (password.trim() === user.password.trim()) {
      req.session.user = user;
      delete req.session.otp;
      delete req.session.email;
      res.redirect("/dashboard");
    } else {
      res.send("Wrong password");
    }
  });
});

module.exports = router;
