const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const productSoldSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const saleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  productsSold: [productSoldSchema],
}, { collection: 'Sales' }); // 指定集合名称为 Sales

// 创建并导出 Sale 模型
const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;