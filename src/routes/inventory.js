const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();

const router = express.Router();
const pool = require('../database.js');

const { isLoggedIn } = require('../lib/auth.js');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/uploads/inventory')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })


router.get('/add', isLoggedIn, async (req, res) => {
    const suppliers = await pool.query('SELECT * FROM suppliers');
    const locations = await pool.query('SELECT * FROM locations');
    const categories = await pool.query('SELECT * FROM categories');
    const status = await pool.query('SELECT * FROM status');
    res.render('inventory/add', { suppliers, locations, categories, status });
});
router.post('/add', isLoggedIn, upload.single('avatar'), async (req, res) => {
    const { categories, description, serialNumber, invoice, brand, suppliers, locations, status } = req.body;
    const categorie = await pool.query('SELECT * FROM categories WHERE name = ?', [categories]);
    var idPool = categorie[0].id;
    var keyNamePool = categorie[0].keyName;
    var lastCode = categorie[0].lastCode;
    // var lastCode = lastCode + 1;
    // console.log(lastCode);
    const newProduct = {
        name: description,
        serialNumber,
        invoice,
        keyName: keyNamePool,
        numCode: lastCode + 1,
        brand,
        user_id: req.user.id,
        photo: req.file.filename,
        categorie_id: idPool,
        supplier_id: suppliers,
        location_id: locations,
        status_id: status
    };
    console.log(newProduct);

    /* UPDATE LAST CODE */
    const editCategorie = {
        lastCode: lastCode + 1
    };
    await pool.query('UPDATE categories set ? WHERE id = ?', [editCategorie, idPool]);

    await pool.query('INSERT INTO inventory set ?', [newProduct]);
    req.flash('success', 'Product saved successfully');
    res.redirect('/inventory');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM inventory WHERE id = ?', [id]);
    req.flash('success', 'Product removed successfully');
    res.redirect('/inventory')
});

router.post('/edit/:id', isLoggedIn, upload.single('avatar'), async (req, res) => {
    const { id } = req.params;
    const { description, suppliers, locations, serialNumber, invoice, brand, status } = req.body;


    if(req.file === undefined) {
        const editProduct = {
            name: description,
            supplier_id: suppliers,
            location_id: locations,
            serialNumber,
            invoice,
            brand,
            status_id: status
        } 
        await pool.query('UPDATE inventory set ? WHERE id = ?', [editProduct, id]);
    } else {
        const editProduct = {
            name: description,
            supplier_id: suppliers,
            location_id: locations,
            serialNumber,
            invoice,
            brand,
            status_id: status,
            photo: req.file.filename
        } 
        await pool.query('UPDATE inventory set ? WHERE id = ?', [editProduct, id]);
    }
       
    
    
     req.flash('success', 'Product updated successfully');
     res.redirect('/inventory')
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const products = await pool.query('SELECT * FROM inventory WHERE id = ?', [id]);

    const suppliers = await pool.query('SELECT * FROM suppliers WHERE id != ?', products[0].supplier_id);
    const supplierSelect = await pool.query('SELECT * FROM suppliers WHERE id = ?', products[0].supplier_id);

    const locations = await pool.query('SELECT * FROM locations WHERE id != ?', products[0].location_id);
    const locationsSelect = await pool.query('SELECT * FROM locations WHERE id = ?', products[0].location_id);

    const status = await pool.query('SELECT * FROM status WHERE id != ?', products[0].status_id);
    const statusSelect = await pool.query('SELECT * FROM status WHERE id = ?', products[0].status_id);


    const categories = await pool.query('SELECT * FROM categories WHERE id = ?', products[0].categorie_id);
    console.log(categories[0]);
    res.render('inventory/edit', { product: products[0], categorie: categories[0], suppliers, 
        supplierSelect: supplierSelect[0], locations, locationsSelect: locationsSelect[0], status, statusSelect: statusSelect[0] });
});

router.get('/', isLoggedIn, async (req, res) => {
    const inventory = await pool.query('SELECT * FROM inventory WHERE user_id = ?', [req.user.id]);
    res.render('inventory/list.hbs', { inventory });
});

module.exports = router;