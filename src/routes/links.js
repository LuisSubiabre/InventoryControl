const express = require('express');
const router = express.Router();

const pool = require('../database.js');
const { isLoggedIn } = require('../lib/auth.js');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});
router.post('/add', isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    //res.send('received');
    req.flash('success', 'Link saved successfully');
    res.redirect('/links')
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link removed successfully');
    res.redirect('/links')
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const editLink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE  links set ? WHERE id = ?', [editLink, id]);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links')
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
    //await pool.query('UPDATE FROM links SET ? WHERE id = ?', [id]);
    //res.redirect('/links')
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list.hbs', {links});
});

module.exports = router;