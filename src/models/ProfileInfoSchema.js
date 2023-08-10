const mongoose = require('mongoose');

const { Schema } = mongoose;

console.log('profile info schema accessed');

const socialSchema = new Schema({
  name: String,
  url: String,
  class: String,
});
// console.log('social schema created', socialSchema)
const technologySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  description: String,
});
// console.log('technology schema created', technologySchema)

const projectSchema = new Schema({
  title: String,
  startDate: String,
  description: String,
  images: [String],
  url: String,
  readmeurl: String,
  technologies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Technology',
    },
  ],
});
// console.log('project schema created', projectSchema)
const experienceSchema = new Schema({
  company: String,
  title: String,
  duration: String,
  mainTech: [String],
  technologies: [String],
});
// console.log('experience schema created', experienceSchema)

const iconSchema = new Schema({
  name: String,
  class: String,
  level: String,
});

const baseInfo = new Schema({
  name: String,
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

const ProfileInfoSchema = new Schema({
  basic_info: baseInfo,
  skills: {
    icons: [iconSchema],
  },
  projects: [projectSchema],
  experience: [experienceSchema],
  technologyMapping: [technologySchema],
});

module.exports = mongoose.model('special-profiles', ProfileInfoSchema);
