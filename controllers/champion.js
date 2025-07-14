const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Champion = require("../models/champion")

router.get("/", async (req, res) => {
    const champions = await Champion.find({})
    res.render("champions/index.ejs", { champions })
})
router.get("/new", (req, res) => {
    res.render("champions/new.ejs")
})
router.post("/", async (req, res) => {
    console.log("Form Submission:", req.body)
    req.body.creator = req.session.user._id
    try {
        await Champion.create(req.body)
        res.redirect("/champions")
    } catch (err) {
        console.log(err)
        res.send("Error creating champion entry")
    }
})
router.get("/:id", async (req, res) => {
    try {
        const champion = await Champion.findById(req.params.id)
        res.render("champions/show.ejs", { champion })
    } catch (err) {
        console.log(err)
        res.send("Error showing champion")
    }
})
router.get("/:id/edit", async (req, res) =>{
    try {
        const champion = await Champion.findById(req.params.id)
        res.render("champions/edit.ejs", { champion })
    } catch (err) {
        console.log(err)
        res.send("Error showing chamion")
    }
})
router.put("/:id", async (req, res) =>{
    try {
        await Champion.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/champions/${req.params.id}`)
    } catch (err) {
        console.log(err)
        res.send("Error updating champion")
    }
})
router.delete("/:id", async (req, res) => {
    try {
        await Champion.findByIdAndDelete(req.params.id)
        res.redirect("/champions")
    } catch (err) {
        console.log(err)
        res.send("Error deleting champion")
    }
})

module.exports = router