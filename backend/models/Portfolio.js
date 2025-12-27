const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,

    name: String,
    bio: String,
    photo: String,

    contact: {
        email: String,
        phone: String,
        linkedin: String,
        github: String
    },

    skills: [
        {
            name: String,
            level: String,
            icon: String
        }
    ],

    projects: [
        {
            title: String,
            description: String,
            tech: String,
            github: String,
            demo: String,
            image: String
        }
    ],

    resume: String,
    theme: Object,
    published: { type: Boolean, default: false }
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
