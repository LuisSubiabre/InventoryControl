const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();

const router = express.Router();
const pool = require('../database.js');

const { isLoggedIn } = require('../lib/auth.js');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/uploads/locations')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + file.originalname)
    }
  })
   
var upload = multer({ storage: storage })

router.get('/', isLoggedIn, async (req, res) => {
    const locations = await pool.query('SELECT * FROM locations ORDER BY description');
    res.render('locations/list.hbs', {locations});
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('locations/add');
});

router.post('/add', isLoggedIn, upload.single('avatar'), async (req, res) => {
    const { description } = req.body;
    const newLocation = {
      description,
      photo: req.file.filename
  };
  await pool.query('INSERT INTO locations set ?', [newLocation]);
  //res.send('received');
  req.flash('success', 'Location saved successfully');
  res.redirect('/locations')
   // console.log(req.file.filename);

});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const location = await pool.query('SELECT * FROM locations WHERE id = ?', [id]);
  res.render('locations/edit', {location: location[0]});
});
  
router.post('/edit/:id', isLoggedIn, upload.single('avatar'), async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const newLocation = {
      description,
      photo: req.file.filename

  };

  await pool.query('UPDATE locations set ? WHERE id = ?', [newLocation, id]);
  req.flash('success', 'Location updated successfully');
  res.redirect('/locations')
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM locations WHERE id = ?', [id]);
  req.flash('success', 'Location removed successfully');
  res.redirect('/locations')
});

module.exports = router;