const { Date } = require("mongoose");
const mongoose = require("mongoose");
const Supplier = require("./supplierModel");
const { ObjectId } = require("mongodb");
const supplySchema = mongoose.Schema(
  {
    price: {
      type: Number,
    },
    date: {
      type: Date,
    },
    supplierId: {
      type: ObjectId,
      ref: 'Suppliers'
    }
  });

const productSchema = mongoose.Schema(
  {
    _id: {
      type: ObjectId,
    },
    name: {
      type: String,
      required: [true, "Please add the user name address"],
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
    },
    tags: [String],

    suppliers: [{
      type: supplySchema,
    }],
  },
);

// if you do not use the third argument
// - mongoose will automatically convert 1 argument to "product" 
// and will use this name as the collection name. 
module.exports = mongoose.model("Products", productSchema, "Products");
