//1_monthProducts.js
const mongoose = require("mongoose");
const Sale = require('./models/saleModel');
const Product = require('./models/productModel'); // 确保路径正确
const connectDb = require('./dbConnection'); // 确保连接到数据库

const getMonthProducts = async () => {
  await connectDb(); // 连接数据库

  try {
    const monthProducts = await Sale.find({
      date: {
        $gte: new Date("2021-01-01"),
        $lt: new Date("2021-02-01")
      }
    }).populate('productsSold.productId'); 

    console.log(monthProducts);
  } catch (error) {
    console.error("Error fetching month products:", error);
  } finally {
    await mongoose.disconnect(); // 断开数据库连接
  }
};

getMonthProducts(); // 调用函数
