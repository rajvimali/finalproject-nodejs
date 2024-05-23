const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate('category subcategory brand');
  res.render('user/index', { products });
};
