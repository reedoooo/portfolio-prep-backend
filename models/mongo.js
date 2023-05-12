const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connected successfully to server");

  // Define a schema
  const Schema = mongoose.Schema;

  // Assuming your documents in the collection have a structure
  // If they have more fields, add those fields to the schema accordingly
  const DocumentSchema = new Schema({
    // your schema definition here
  });

  // Compile model from schema
  const DocumentModel = mongoose.model('documents', DocumentSchema);

  // Find some documents in the collection
  DocumentModel.find({}, function(err, docs) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Found the following records");
    console.log(docs);
  });
});
