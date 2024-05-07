const mongoose = require('mongoose')


const settingsSchema = new mongoose.Schema({
    name: String,
    userSettings: Object
})


const settingsModel = mongoose.model("Settings", settingsSchema)

module.exports = settingsModel