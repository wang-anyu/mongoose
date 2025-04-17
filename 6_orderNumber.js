//6_orderNumber.js
const mongoose = require("mongoose");
const Sale = require('./models/saleModel');
const Product = require('./models/productModel');
const Supplier = require('./models/supplierModel'); // 确保路径正确
const connectDb = require('./dbConnection'); 

const orderNumber = async () => {
    await connectDb();

    try {
        const stats = await Sale.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date("2021-01-01"),
                        $lt: new Date("2022-01-01")
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    orderCount: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // 按日期排序
            }
        ]);

        console.table(stats);
    } catch (error) {
        console.error("Error fetching order statistics:", error);
    } finally {
        await mongoose.disconnect();
    }
};

orderNumber();