const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Portfolio = require("../models/Portfolio");
const auth = require("../middleware/auth");

const router = express.Router();

/* ===== ENSURE UPLOAD DIR ===== */
const uploadDir = path.join(__dirname, "..", "uploads", "resumes");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

/* ===== MULTER CONFIG ===== */
const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadDir),
    filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

/* ===== GET PORTFOLIO ===== */
router.get("/", auth, async (req, res) => {
    let portfolio = await Portfolio.findOne({ userId: req.user.id });

    if (!portfolio) {
        portfolio = await Portfolio.create({
            userId: req.user.id,
            skills: [],
            projects: []
        });
    }

    res.json(portfolio);
});

/* ===== UPDATE PROFILE / THEME / PUBLISH ===== */
router.put("/profile", auth, async (req, res) => {
    await Portfolio.findOneAndUpdate(
        { userId: req.user.id },
        req.body,
        { new: true }
    );
    res.json({ msg: "Updated" });
});

/* ===== SKILLS ===== */
router.post("/skill", auth, async (req, res) => {
    let portfolio = await Portfolio.findOne({ userId: req.user.id });

    if (!portfolio) {
        portfolio = await Portfolio.create({
            userId: req.user.id,
            skills: [],
            projects: []
        });
    }

    portfolio.skills.push({
        name: req.body.name,
        level: req.body.level || "Beginner",
        icon: req.body.icon || "⭐"
    });

    await portfolio.save();
    res.json(portfolio.skills.at(-1));
});

router.put("/skill/:id", auth, async (req, res) => {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    const skill = portfolio.skills.id(req.params.id);

    if (!skill) return res.status(404).json({ msg: "Skill not found" });

    Object.assign(skill, req.body);
    await portfolio.save();
    res.json(skill);
});

router.delete("/skill/:id", auth, async (req, res) => {
    await Portfolio.updateOne(
        { userId: req.user.id },
        { $pull: { skills: { _id: req.params.id } } }
    );
    res.json({ msg: "Skill deleted" });
});

/* ===== PROJECTS ===== */
router.post("/project", auth, async (req, res) => {
    let portfolio = await Portfolio.findOne({ userId: req.user.id });

    if (!portfolio) {
        portfolio = await Portfolio.create({
            userId: req.user.id,
            skills: [],
            projects: []
        });
    }

    portfolio.projects.push(req.body);
    await portfolio.save();
    res.json(portfolio.projects.at(-1));
});

router.put("/project/:id", auth, async (req, res) => {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    const project = portfolio.projects.id(req.params.id);

    if (!project) return res.status(404).json({ msg: "Project not found" });

    Object.assign(project, req.body);
    await portfolio.save();
    res.json(project);
});

router.delete("/project/:id", auth, async (req, res) => {
    await Portfolio.updateOne(
        { userId: req.user.id },
        { $pull: { projects: { _id: req.params.id } } }
    );
    res.json({ msg: "Project deleted" });
});

/* ===== RESUME UPLOAD ===== */
router.post("/resume", auth, upload.single("resume"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    portfolio.resume = req.file.filename;
    await portfolio.save();

    res.json({ resume: portfolio.resume });
});

/* ===== RESUME DOWNLOAD ===== */
router.get("/resume/:file", (req, res) => {
    const filePath = path.join(uploadDir, req.params.file);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ msg: "Resume not found" });
    }

    res.download(filePath);
});

module.exports = router;
