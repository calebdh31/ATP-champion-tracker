const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const session = require("express-session")

const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")


const port = process.env.PORT ? process.env.PORT : "3000"

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan('dev'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
const isSignedIn = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect("/auth/sign-in")
    }
}
const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null
    next()
}
app.use(passUserToView)
//ROUTES
app.get("/", (req, res) =>{
    res.render("index.ejs")
})
app.get("/home", (req, res) => {
    res.render("home.ejs")
})
const authController = require("./controllers/auth.js")
const championController = require("./controllers/champion")
app.use("/auth", authController)
app.use(isSignedIn)
app.use("/champions", championController)



// GET /results - Display all tournament results
// GET /results/new - Show a form to create a new result
// POST /results - Take form data and add it to the database
// GET /results/:id - Show a specific result
// GET /results/:id/edit - Show edit form for one result
// PUT /results/:id - Update that result
// DELETE /results/:id - Remove that result



app.listen(port, () => {
  console.log(`The ATP Champion Tracker app is ready on port ${port}!`)
})
