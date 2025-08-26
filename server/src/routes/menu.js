const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const fs = require('fs');
const path = require('path');

// GET /api/menu - return menu grouped by category
router.get('/', async (req, res) => {
  try {
    const useDb = process.env.USE_DB === 'true';
    let items = [];
    if (useDb) {
      try {
        items = await MenuItem.find().lean();
      } catch (e) {
        // ignore DB errors, we'll try fallback
      }
    }

    let grouped;
  if (useDb && Array.isArray(items) && items.length > 0) {
      grouped = items.reduce((acc, it) => {
        // Normalize stored image paths from legacy '/assets/graphics/...'
        let image = it.image;
        if (typeof image === 'string') {
          image = image.replace(/^\/assets\/graphics/, '/images');
        }
        acc[it.category] = acc[it.category] || [];
        acc[it.category].push({ id: it.id, name: it.name, description: it.description, price: it.price, image, extras: it.extras });
        return acc;
      }, {});
    } else {
      // Fallback to seed JSON on disk
      const seedPath = path.join(__dirname, '../seed/menuData.json');
      const raw = fs.readFileSync(seedPath, 'utf8');
      const json = JSON.parse(raw);
      const normalizeCategory = (arr) => arr.map((it) => ({
        id: it.id,
        name: it.name,
        description: it.description,
        price: it.price,
        image: typeof it.image === 'string' ? it.image.replace(/^\/assets\/graphics/, '/images') : it.image,
        extras: it.extras || [],
      }));
      grouped = {
        pizzas: normalizeCategory(json.pizzas || []),
        pastas: normalizeCategory(json.pastas || []),
        appetizers: normalizeCategory(json.appetizers || []),
        desserts: normalizeCategory(json.desserts || []),
        soups: normalizeCategory(json.soups || []),
        salads: normalizeCategory(json.salads || []),
      };
    }

    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

module.exports = router;
