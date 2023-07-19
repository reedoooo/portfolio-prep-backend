const MyProfile = require('../models/ProfileInfoSchema');

exports.getProfile = async (req, res) => {
  console.log('myprofile accessed');
  // console.log("**************getData************");

  try {
    const myProfile = await MyProfile.find({});

    res.status(200).json(myProfile); // Send myProfile directly
    console.log(myProfile[0]); // Log myProfile directly
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('try something else...');
  }
};
