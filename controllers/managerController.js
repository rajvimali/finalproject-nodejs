const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Brand = require('../models/Brand');
const Product = require('../models/Product');

exports.getDashboard = (req, res) => {
    res.render('manager/dashboard');
};

exports.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.render('manager/addCategory', { categories });
};

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    let category = new Category({ name });
    await category.save();
    res.redirect('/manager/categories');
};

exports.getSubcategories = async (req, res) => {
    const subcategories = await Subcategory.find().populate('category');
    const categories = await Category.find();
    res.render('manager/addSubcategory', { subcategories, categories });
};

exports.createSubcategory = async (req, res) => {
    const { name, category } = req.body;
    let subcategory = new Subcategory({ name, category });
    await subcategory.save();
    res.redirect('/manager/subcategories');
};

exports.getBrands = async (req, res) => {
    const brands = await Brand.find();
    res.render('manager/addBrand', { brands });
};

exports.createBrand = async (req, res) => {
    const { name } = req.body;
    let brand = new Brand({ name });
    await brand.save();
    res.redirect('/manager/brands');
};

exports.getProducts = async (req, res) => {
    const products = await Product.find().populate('category').populate('subcategory').populate('brand');
    const categories = await Category.find();
    const subcategories = await Subcategory.find();
    const brands = await Brand.find();
    res.render('manager/addProduct', { products, categories, subcategories, brands });
};

exports.createProduct = async (req, res) => {
    const { name, price,image, category, subcategory, brand } = req.body;
    let product = new Product({ name, image, price, category, subcategory, brand });
    await product.save();
    res.redirect('/manager/products');
};
