const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Item model
const Item = require('../models/Item');

// Get items route
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.render('items', {
      items,
      name: req.user.name
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error fetching items');
    res.redirect('/dashboard');
  }
});

// Get item details route
router.get('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      req.flash('error_msg', 'Item not found');
      return res.redirect('/data');
    }
    res.render('item_details', {
      item,
      name: req.user.name
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error fetching item');
    res.redirect('/data');
  }
});

module.exports = router; 