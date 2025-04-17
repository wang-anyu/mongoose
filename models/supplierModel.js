const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  house: { type: String, required: true },
  office: { type: String, required: true },
});

const supplierSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: addressSchema,
}, { collection: 'Suppliers' }); // 指定集合名称为 Suppliers

// 创建并导出 Supplier 模型
const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;