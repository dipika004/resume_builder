const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  personal: {
    name: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    github: String,
    portfolio: String,
    summary: String,
  },
  education: [{ school: String, degree: String, year: String }],
  experience: [{ company: String, role: String, year: String }],
  projects: [{ title: String, description: String, link: String }],
  certifications: [{ name: String, org: String, link: String }],
  skills: [String],
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);
