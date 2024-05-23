const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const { ensureManager } = require('../middleware/authMiddleware');

router.get('/dashboard', ensureManager, managerController.getDashboard);
router.get('/categories', ensureManager, managerController.getCategories);
router.post('/categories', ensureManager, managerController.createCategory);
router.get('/subcategories', ensureManager, managerController.getSubcategories);
router.post('/subcategories', ensureManager, managerController.createSubcategory);
router.get('/brands', ensureManager, managerController.getBrands);
router.post('/brands', ensureManager, managerController.createBrand);
router.get('/products', ensureManager, managerController.getProducts);
router.post('/products', ensureManager, managerController.createProduct);

module.exports = router;
