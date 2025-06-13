const express = require("express");
const router = express.Router();

// Protected dashboard
router.get("/dashboard", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    res.render("dashboard", { username: req.session.user.username });
});

module.exports = router;
