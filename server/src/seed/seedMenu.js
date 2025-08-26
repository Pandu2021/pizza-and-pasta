require('dotenv').config();
// Force reliable DNS resolvers to avoid local DNS timeouts
try {
  const dns = require('dns');
  dns.setServers(['1.1.1.1', '8.8.8.8']);
} catch {}
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'menuData.json');
if (!fs.existsSync(dataPath)) {
  console.error('menuData.json not found in seed folder');
  process.exit(1);
}

let menuJSON;
try {
  const raw = fs.readFileSync(dataPath, 'utf8');
  menuJSON = JSON.parse(raw);
} catch (err) {
  console.error('Failed to read/parse menuData.json', err);
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    // Upsert items from each category
    const categories = Object.keys(menuJSON);
    for (const cat of categories) {
      for (const item of menuJSON[cat]) {
        const doc = {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: cat,
          image: item.image,
          extras: item.extras || [],
        };
        await MenuItem.updateOne({ id: item.id }, { $set: doc }, { upsert: true });
        console.log(`Upserted ${item.id}`);
      }
    }

    console.log('Seeded/Updated menu items');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
