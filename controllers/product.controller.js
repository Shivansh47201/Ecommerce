import ProductService from "../services/product.service.js";

//Create Product Request
export const createProduct = async (req, res) => {
  try {
    // const imageUrl = req.file?.path || null;
    // const publicId = req.file?.filename || null;

    // const productData = {
    //   ...req.body,
    //   image: imageUrl,
    //   imagePublicId: publicId,
    // };

    const product = await ProductService.createProduct(
      req.body,
      req.user._id,
      req.cloudImages 
    );
    res.status(201).json({
      message: "Product listed successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

//Get All Product Request
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts(req.query);
    res.status(200).json({
      success: true,
      message: "All Products Get Successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get Single Product Request
export const getProductsById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      message: "A product Get Successfully",
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//Update Product Request
export const updateProduct = async (req, res) => {
  try {
    // Handle multiple images if needed
    const updated = await ProductService.updateProduct(
      req.params.id,
      req.body,
      req.cloudImages 
    );
    res.status(200).json({
      success: true,
      message: "A product Updated Successfully",
      updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Delete Product Request
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await ProductService.deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      message: "A product Delete Successfully",
      deleted,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
