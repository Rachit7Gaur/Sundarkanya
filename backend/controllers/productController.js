import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "SundarKanya/products",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );

          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        imageUrls.push(url);
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images: imageUrls,
      seller: req.user.id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProducts = async(req,res)=>{
  try{
    const products = await Product.find().populate("seller" , "name email");

    res.json(products);
  }catch(error){
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

export const getProductsByCategory = async(req,res)=>{
  try{
    const {category} = req.params;

    const products = await Product.find({category}).populate("seller" , "name email");

    res.json(products);
  }catch(error){
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

export const getProductById = async(req,res)=>{
  try{
    const product = await Product.findById(req.params.id).populate("seller", "name email");

    if(!product){
      return res.status(404).json({
        message: "Product not found"
      })
    }

    res.json(product);
  }catch(error){
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const { name, description, price, stock, category } = req.body;

    let imageUrls = product.images;

    if (req.files && req.files.length > 0) {
      imageUrls = [];

      for (const file of req.files) {
        const url = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "SundarKanya/products",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );

          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        imageUrls.push(url);
      }
    }

    product.name = name;
    product.description = description;
    product.price = Number(price);
    product.stock = Number(stock);
    product.category = category;
    product.images = imageUrls;

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};