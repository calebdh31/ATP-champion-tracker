const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const session = require("express-session")

// Auth Routes

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs")
})
router.post("/sign-up", async (req, res) => {
    
    const userInDatabase = await User.findOne({ username: req.body.username})
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const user = await User.create(req.body)
    req.session.user = user
    res.redirect("/home")
})
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs")
})
router.post("/sign-in", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (!userInDatabase) {
        return res.send("Login failed. User does not exist.")
    }
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
    )
    if (!validPassword) {
        return res.send("Login failed, please try again.")
    }
    req.session.user = userInDatabase
    res.redirect("/home")
})
module.exports = router