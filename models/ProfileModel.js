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
  
//   const iconSchema = new Schema({
//     name: String,
//     class: String,
//     level: String,
//   });
  
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
  
  const basicInfoSchema = new Schema({
    basic_info: baseInfo,
    // skills: {
    //   icons: [iconSchema],
    // },
    projects: [projectSchema],
    experience: [experienceSchema],
  });

  module.exports = mongoose.model("human-collections", basicInfoSchema);


// const mongoose = require("mongoose");

// const basicInfoSchema = new mongoose.Schema({
//   basic_info: {
//     name: String,
//     titles: [String],
//     social: [
//       {
//         name: String,
//         url: String,
//         class: String,
//       },
//     ],
//     image: String,
//     description_header: String,
//     description: String,
//     section_name: {
//       profile: String,
//       projects: String,
//       mystuff: String,
//       skills: String,
//       experience: String,
//     },
//   },
//   skills: {
//     icons: [
//       {
//         name: String,
//         class: String,
//         level: Number,
//       },
//     ],
//   },
//   projects: [
//     {
//       title: String,
//       startDate: String,
//       description: String,
//       images: [String],
//       url: String,
//       technologies: [
//         {
//           class: String,
//           name: String,
//         },
//       ],
//     },
//   ],
//   experience: [
//     {
//       company: String,
//       title: String,
//       years: String,
//       mainTech: [String],
//       technologies: [String],
//     },
//   ],
// });

// module.exports = mongoose.model("human-collections", basicInfoSchema);
