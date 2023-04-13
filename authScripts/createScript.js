async function create(user, callback) {
    const { MongoClient } = require('mongodb@3.1.4');
    const uri = 'mongodb+srv://reedthahuman:Olivervogt1@clusterthahuman.drldbfy.mongodb.net/human-database?retryWrites=true&w=majority';
    
    try {
      const client = await MongoClient.connect(uri);
      const users = client.db('human-database').collection('human-collection');
      const existingUser = await users.findOne({ email: user.email });
  
      if (existingUser) {
        return callback(new Error('User already exists.'));
      }
  
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash(user.password, 10);
  
      const result = await users.insertOne({
        email: user.email,
        password: hashedPassword
      });
  
      callback(null, {
        user_id: result.insertedId.toString(),
        email: user.email
      });
    } catch (error) {
      callback(error);
    }
  }
  