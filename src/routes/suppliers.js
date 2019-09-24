const express = require('express');
const router = express.Router();

const pool = require('../database.js');

const { isLoggedIn } = require('../lib/auth.js');

router.get('/', isLoggedIn, async (req, res) => {
    const suppliers = await pool.query('SELECT * FROM suppliers');
    res.render('suppliers/list.hbs', {suppliers});
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('suppliers/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { description, contact, email, phone, adress } = req.body;
    //console.log(req.body);
    const newSupplier = {
        description,
        contact,
        email,
        phone,
        adress,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO suppliers set ?', [newSupplier]);
    //res.send('received');
    req.flash('success', 'Supplier saved successfully');
    res.redirect('/suppliers')
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    //console.log(id);
    const supplier = await pool.query('SELECT * FROM suppliers WHERE id = ?', [id]);
    res.render('suppliers/edit', {supplier: supplier[0]});
    //await pool.query('UPDATE FROM links SET ? WHERE id = ?', [id]);
    //res.redirect('/links')
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
    await pool.query('UPDATE suppliers set ? WHERE id = ?', [newSupplier, id]);
    req.flash('success', 'Suppliers updated successfully');
    res.redirect('/suppliers')
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM suppliers WHERE id = ?', [id]);
    req.flash('success', 'Suppliers removed successfully');
    res.redirect('/suppliers')
});

module.exports = router;