const express = require('express');
const router = express.Router();

const pool = require('../database.js');

const { isLoggedIn } = require('../lib/auth.js');

router.get('/', isLoggedIn, async (req, res) => {
    const status = await pool.query('SELECT * FROM status');
    res.render('status/list.hbs', {status});
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('status/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { title } = req.body;
    //console.log(req.body);
    const newStatus = {
        description: title
    };
    await pool.query('INSERT INTO status set ?', [newStatus]);
    //res.send('received');
    req.flash('success', 'Status saved successfully');
    res.redirect('/status')
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const supplier = await pool.query('SELECT * FROM status WHERE id = ?', [id]);
    res.render('status/edit', {supplier: supplier[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { description, contact, email, phone, adress } = req.body;
    const newSupplier = {
        description,
        contact,
        email,
        phone,
        adress
    };
    await pool.query('UPDATE status set ? WHERE id = ?', [newSupplier, id]);
    req.flash('success', 'Status updated successfully');
    res.redirect('/status')
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM status WHERE id = ?', [id]);
    req.flash('success', 'status removed successfully');
    res.redirect('/status')
});

module.exports = router;