import Product from "../models/product.model.js";
import Joi from "joi";

// Validation schema
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().allow(""),
  images: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required(),
      public_id: Joi.string().required(),
    })
  ),
  stock: Joi.number().integer().min(0),
  category: Joi.string().required(),
});

class ProductService {
  // Create Product
  async createProduct(data, userId, cloudImages) {
    const { error } = productSchema.validate(data);
    if (error) throw new Error(error.details[0].message);

    let images = [];

    if (cloudImages && cloudImages.length > 0) {
      images = cloudImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      }));
    }

    const newProduct = new Product({
      ...data,
      createdBy: userId,
      images,
    });

    return await newProduct.save();
  }

  // Get All Productsll
  async getAllProducts() {
    return await Product.find();
  }

  // Get Product by ID
  async getProductById(id) {
    const cleanId = id.replace(/^:/, "");
    const product = await Product.findById(cleanId);
    if (!product) throw new Error("Product not found");
    return product;
  }

  // Update Product
  async updateProduct(id, updateData, cloudImages) {
      const cleanId = id.replace(/^:/, "");
    if (cloudImages && cloudImages.length > 0) {
      updateData.images = cloudImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      }));
    }

    const { error } = productSchema.validate(updateData, {
      allowUnknown: true,
    });
    if (error) throw new Error(error.details[0].message);

    const updatedProduct = await Product.findByIdAndUpdate(cleanId, updateData, {
      new: true,
    });

    if (!updatedProduct) throw new Error("Product not found for update");

    return updatedProduct;
  }

  // Delete Product
  async deleteProduct(id) {
      const cleanId = id.replace(/^:/, "");
    const deletedProduct = await Product.findByIdAndDelete(cleanId);
    if (!deletedProduct) throw new Error("Product not found for deletion");
    return deletedProduct;
  }
}

export default new ProductService();
