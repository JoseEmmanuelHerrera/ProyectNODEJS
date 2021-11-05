const express = require('express');
const router  = express.Router();
const pool = require('../database.js');


router.get('/', async(req, res) =>{
    let listPoducts =pool.query('SELECT  * FROM  products');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listPoducts : listPoducts
    });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    let product = await pool.query('SELECT  * FROM  products WHERE idProduct = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        product:product
    });

});

router.post('/create', async(req, res) => {
const {name, precio} = req.body;
const product = {
    name, precio, status: 1
};
    await pool.query('INSERT INTO products set ?', [product]);
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        product:product
    });

});

router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const {name, precio } = req.body;

    const product = { name , precio };

    pool.query('UPDATE  products SET ? WHERE  idProduct = ?', [product, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        product:product
    });
});

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;

    pool.query('UPDATE products SET status = 0  WHERE idProduct = ?' , [id]);
    res.json({
        status: 200,
        message: "Se ha inactivado correctamente",
    });
})


module.exports = router;