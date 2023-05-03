const MongoClient = require('mongodb').MongoClient;

function getByEmail(email, callback) {
  const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true });
  
  client.connect(function(err) {
    if (err) {
      return callback(err);
    }
    
    const db = client.db('human-database');
    const collection = db.collection('users');
    
    collection.findOne({ email: email }, function(err, user) {
      if (err) {
        client.close();
        return callback(err);
      }
      
      client.close();
      return callback(null, user);
    });
  });
}
