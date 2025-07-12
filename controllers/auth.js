const express = require("express")
const router = express.Router()
const User = require("../models/user.js")

// Auth Routes

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs")
})
router.post("/sign-up", async (req, res) => {
    res.send(req.body.username)
    const userInDatabase = await User.findOne({ username: req.body.username})
})
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs")
})

module.exports = router