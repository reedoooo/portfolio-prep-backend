const mongoose = require('mongoose');
const { Schema } = mongoose;

const socialSchema = new Schema({
  name: String,
  url: String,
  class: String,
});

const technologySchema = new Schema({
  class: String,
  name: String,
});

const projectSchema = new Schema({
  title: String,
  startDate: String,
  description: String,
  images: [String],
  url: String,
  technologies: [technologySchema],
});

const experienceSchema = new Schema({
  company: String,
  title: String,
  years: String,
  mainTech: [String],
  technologies: [String],
});

const baseInfo = new Schema({
  name: { type: String, required: true },
  titles: [String],
  social: [socialSchema],
  image: String,
  description_header: String,
  description: String,
  section_name: {
    profile: String,
    projects: String,
    mystuff: String,
    skills: String,
    experience: String,
  },
});

const roleSchema = new Schema({
  name: { type: String, required: true },
  capabilities: [String],
});

const securityInfo = new Schema({
  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role_data: { type: roleSchema, required: true },
});

const UserSchema = new Schema({
  basic_info: { type: baseInfo, required: false },
  login_data: { type: securityInfo, required: true },
  projects: [projectSchema],
  experience: [experienceSchema],
}, { timestamps: true });

module.exports = mongoose.model('Users', UserSchema);
