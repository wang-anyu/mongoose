const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const supplierSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }, 
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  stock: { type: Number, required: true },
  suppliers: [supplierSchema],
},{collection:'Products'});

// 创建并导出 Product 模型
const Product = mongoose.model("Product", productSchema);
module.exports = Product;