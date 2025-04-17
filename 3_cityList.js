//3_cityList.js
const mongoose = require("mongoose");
const Sale = require('./models/saleModel');
const Product = require('./models/productModel');
const Supplier = require('./models/supplierModel'); // 确保路径正确
const connectDb = require('./dbConnection'); 

const cityList = async () => {
    await connectDb(); // 连接数据库

    try {
        const citys = await Supplier.find().distinct('address.city'); 
        console.log("Shipping Cities:", citys);
    } catch (error) {
        console.error("Error fetching shipping cities:", error);
    } finally {
        await mongoose.disconnect(); // 断开数据库连接
    }
};

cityList();