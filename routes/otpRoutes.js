const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send-otp", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email is required");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  req.session.otp = otp;
  req.session.email = email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "productionhouse2201@gmail.com",
      pass: "rxgq asts hpfq chws",
    },
  });

  const mailOptions = {
    from: "productionhouse2201@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return res.status(500).send("Failed to send OTP");
    res.send("OTP sent to your email");
  });
});

module.exports = router;
