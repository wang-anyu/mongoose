const { ObjectId } = require("mongodb");
const { Date } = require("mongoose");
const mongoose = require("mongoose");
const supplierSchema = mongoose.Schema(
  {
    _id: {
      type: ObjectId,
    },
    name: {
      type: String,
      required: [true, "Please add the user name address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add the user name address"],
    },
    address: {
      city: String,
      street: String,
      house: String,
      office: String,
    }
  });

module.exports = mongoose.model("Suppliers", supplierSchema, "Suppliers");

