const express = require("express");
const router = express.Router();
const { db } = require("../Config/DataBase");

router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

router.post("/delete", (req, res) => {
  const userId = req.session.user?.id;
  if (!userId) return res.status(401).send("Not logged in");

  db.query("DELETE FROM users WHERE id = ?", [userId], (err) => {
    if (err) return res.send("Error deleting account");
    req.session.destroy(() => res.redirect("/register"));
  });
});

module.exports = router;
