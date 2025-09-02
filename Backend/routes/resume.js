const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const { protect } = require("../middleware/authMiddleware");

// Create Resume
router.post("/", protect, async (req, res) => {
  try {
    const { personal, education, experience, skills, projects, certifications } = req.body;

    const resume = await Resume.create({
      user: req.user._id,
      personal,
      education,
      experience,
      skills,
      projects,
      certifications,
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating resume", error: error.message });
  }
});

// Get all resumes for user
router.get("/", protect, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resumes", error: error.message });
  }
});

// Get single resume
router.get("/:id", protect, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resume", error: error.message });
  }
});

// Update Resume
router.put("/:id", protect, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // Only allow the owner to update
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { personal, education, experience, skills, projects, certifications } = req.body;

    resume.personal = personal;
    resume.education = education;
    resume.experience = experience;
    resume.skills = skills;
    resume.projects = projects;
    resume.certifications = certifications;

    const updatedResume = await resume.save();
    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: "Error updating resume", error: error.message });
  }
});

// Delete Resume
router.delete("/:id", protect, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // Only owner can delete
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await resume.deleteOne();
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resume", error: error.message });
  }
});


module.exports = router;
