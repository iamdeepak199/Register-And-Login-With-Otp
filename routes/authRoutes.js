const express = require("express");
const multer = require("multer");
const path = require('path');
const bcrypt = require("bcrypt");
const { db } = require("../Config/DataBase");

const router = express.Router();

// Home page
router.get("/", (req, res) => {
    res.render("index");
});

// Login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Register page
router.get("/register", (req, res) => {
    res.render("register");
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
// Handle registration
// ✅ NEW CODE — USE THIS INSTEAD
router.post("/register", upload.single("img"), async (req, res) => {
    try {
        const { username, email, password, companyname, age, dob } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const img = req.file ? req.file.filename : null;

        const sql = "INSERT INTO users (username, email, password, companyname, age, dob, img) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [username, email, hashedPassword, companyname, age, dob, img], (err) => {
            if (err) {
                console.error("MySQL Error:", err);
                return res.send("Error during registration");
            }
            res.redirect("/login");
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.send("An error occurred during registration");
    }
});


// Handle login
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err || results.length === 0) return res.send("Invalid credentials");

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.user = user;
            res.redirect("/dashboard");
        } else {
            res.send("Wrong password");
        }
    });
});

router.post("/delete", (req, res) => {
    const userId = req.session.user?.id; // Make sure 'id' matches your database column

    if (!userId) {
        return res.status(401).send("Not logged in");
    }

    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [userId], (err) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.send("Error deleting account");
        }

        req.session.destroy(() => {
            res.redirect("/register"); // or send a message
        });
    });
});


// Logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;
