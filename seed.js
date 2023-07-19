
// Purpose: This file is used to seed the database with data. It is not used in the final product.

const mongoose = require('mongoose');

require('dotenv').config();



mongoose.connect(process.env.DATABASE_URL);

const Tab = require('./models/TabModel');

async function seed() {
  let exampleTab = await Tab.create({
    id: '',
    title: 'ExampleTab',
    linkUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2FMeLanaRhoades%2Fstatus%2F1392465582906232833&psig=AOvVaw3RRjVa0TPOpdd3SJJVGPbr&ust=1681710752151000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPj-4fHarf4CFQAAAAAdAAAAABAL',
    imageUrl: 'https://pbs.twimg.com/media/E0i7hdIVIAUBZ9i.jpg:large',
    size: 'medium',
    description: 'ExampleTab',
  });

  console.log(exampleTab);

  mongoose.disconnect();
}

seed();
