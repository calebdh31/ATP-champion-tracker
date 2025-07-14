const mongoose = require("mongoose")

const championSchema = new mongoose.Schema({
    tournament: { type: String, required: true},
    level: {
        type: String,
        enum: ["Grand Slam", "ATP Masters 1000", "ATP 500", "ATP 250"],
        required: true,
    },
    year: { type: Number, required: true },
    champion: { type: String, required: true },
    finalScore: { type: String, required: true },
    creator: { ref: "User", type: mongoose.Types.ObjectId }
})
 module.exports = mongoose.model("Champion", championSchema)

