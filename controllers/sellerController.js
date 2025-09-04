const Product = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    const { name, brand, price, description, category, rating } = req.body;
    const sellerId = req.user;
    
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }
    
    const imageUrl = req.file.path;
    
    const product = new Product({
      name,
      brand,
      price,
      description,
      category,
      rating,
      imageUrl,
      seller: sellerId
    });
    
    await product.save();
    
    console.log("Product created successfully:", {
      name,
      brand,
      price,
      description,
      category,
      rating,
      imageUrl
    });
    
    res.status(201).json({
      message: "Product Created Successfully",
      product,
    });
    
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.user });
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProducts = async(req,res,next) => {
  const productId = req.params.id
  await Product.findByIdAndDelete(productId)
  res.status(200).json({message:'Product deleted successfully'})
}