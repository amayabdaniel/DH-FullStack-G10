const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const adminController = require('../controllers/adminController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/products_images'))
    },
    filename: (req, file, cb) => {
        cb(null, 'product-' + Date.now() + path.extname('file'))
    }
})

const upload = multer({ storage })


// Cart Routes

router.get('/', adminController.products_list);
router.get('/edit/:id', upload.single('cover') ,adminController.product_edit);

// Export

module.exports = router;