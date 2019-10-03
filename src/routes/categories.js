const express = require('express');
const router = express.Router();

const pool = require('../database.js');

const { isLoggedIn } = require('../lib/auth.js');

router.get('/', isLoggedIn, async (req, res) => {
    const categories = await pool.query('SELECT * FROM categories');
    res.render('categories/list.hbs', {categories});
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('categories/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { description, keyName } = req.body;
    console.log(req.body);
    const newSCategorie = {
        name: description,
        lastCode: 0,
        keyName
    };
    await pool.query('INSERT INTO categories set ?', [newSCategorie]);
    req.flash('success', 'Categorie saved successfully');
    res.redirect('/categories')
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const categories = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    res.render('categories/edit', {categories: categories[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { description, keyName } = req.body;
    const editCategorie = {
        name: description,
        keyName
    };
    await pool.query('UPDATE categories set ? WHERE id = ?', [editCategorie, id]);
    req.flash('success', 'Categories updated successfully');
    res.redirect('/categories')
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    req.flash('success', 'Categories removed successfully');
    res.redirect('/categories')
});

module.exports = router;