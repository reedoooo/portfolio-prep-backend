async function changePassword(email, newPassword, callback) {
    const { MongoClient } = require('mongodb@3.1.4');
    const uri = 'mongodb+srv://reedthahuman:Olivervogt1@clusterthahuman.drldbfy.mongodb.net/human-database?retryWrites=true&w=majority';
    
    try {
      const client = await MongoClient.connect(uri);
      const users = client.db('human-database').collection('human-collection');
      const user = await users.findOne({ email: email });
  
      if (!user) {
        return callback(new Error('User not found.'));
      }
  
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await users.updateOne({ email: email }, { $set: { password: hashedPassword } });
  
      return callback(null, {
        user_id: user._id.toString(),
        email: user.email
      });
    } catch (error) {
      callback(error);
    }
  }
  