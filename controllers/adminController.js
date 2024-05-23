const User = require('../models/User');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Brand = require('../models/Brand');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');

exports.getDashboard = (req, res) => {
    res.render('admin/dashboard');
};

exports.getManagers = async (req, res) => {
    const managers = await User.find({ role: 'manager' });
    res.render('admin/managers', { managers });
};

exports.createManager = async (req, res) => {
    const { username, email, password } = req.body;
    let user = new User({ username, email, password, role: 'manager' });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.redirect('/admin/managers');
};

exports.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.render('admin/categories', { categories });
};

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    let category = new Category({ name });
    await category.save();
    res.redirect('/admin/categories');
};

exports.getSubcategories = async (req, res) => {
    const subcategories = await Subcategory.find().populate('category');
    const categories = await Category.find();
    res.render('admin/subcategories', { subcategories, categories });
};

exports.createSubcategory = async (req, res) => {
    const { name, category } = req.body;
    let subcategory = new Subcategory({ name, category });
    await subcategory.save();
    res.redirect('/admin/subcategories');
};

exports.getBrands = async (req, res) => {
    const brands = await Brand.find();
    res.render('admin/brands', { brands });
};

exports.createBrand = async (req, res) => {
    const { name } = req.body;
    let brand = new Brand({ name });
    await brand.save();
    res.redirect('/admin/brands');
};

exports.getProducts = async (req, res) => {
    const products = await Product.find().populate('category').populate('subcategory').populate('brand');
    const categories = await Category.find();
    const subcategories = await Subcategory.find();
    const brands = await Brand.find();
    res.render('admin/products', { products, categories, subcategories, brands });
};

exports.createProduct = async (req, res) => {
    const { name, description, price, category,image, subcategory, brand } = req.body;
    let product = new Product({ name, description, price,image, category, subcategory, brand });
    await product.save();
    res.redirect('/admin/products');
};


exports.viewProduct = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category').populate('subcategory').populate('brand');
    res.render('admin/viewProduct', { product });
};

exports.editProductPage = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find();
    const subcategories = await Subcategory.find();
    const brands = await Brand.find();
    res.render('admin/editProduct', { product, categories, subcategories, brands });
};

exports.updateProduct = async (req, res) => {
    const { name, price,image, category, subcategory, brand } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price,image, category, subcategory, brand });
    res.redirect('/admin/products');
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
};
