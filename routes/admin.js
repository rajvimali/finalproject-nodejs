const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/authMiddleware');

router.get('/dashboard', ensureAdmin, adminController.getDashboard);
router.get('/managers', ensureAdmin, adminController.getManagers);
router.post('/managers', ensureAdmin, adminController.createManager);
router.get('/categories', ensureAdmin, adminController.getCategories);
router.post('/categories', ensureAdmin, adminController.createCategory);
router.get('/subcategories', ensureAdmin, adminController.getSubcategories);
router.post('/subcategories', ensureAdmin, adminController.createSubcategory);
router.get('/brands', ensureAdmin, adminController.getBrands);
router.post('/brands', ensureAdmin, adminController.createBrand);
router.get('/products', ensureAdmin, adminController.getProducts);
router.post('/products', ensureAdmin, adminController.createProduct);
router.get('/products/view/:id',ensureAdmin, adminController.viewProduct);
router.get('/products/edit/:id', ensureAdmin, adminController.editProductPage);
router.post('/products/edit/:id', ensureAdmin, adminController.updateProduct);
router.post('/products/delete/:id', ensureAdmin, adminController.deleteProduct);

module.exports = router;



