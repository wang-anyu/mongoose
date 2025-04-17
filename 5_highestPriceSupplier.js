//5_highestPriceSupplier.js
const mongoose = require("mongoose");
const Product = require('./models/productModel'); // 确保路径正确
const connectDb = require('./dbConnection'); 

const highestPriceSupplier = async () => {
    await connectDb();

    try {
        const results = await Product.aggregate([
            {
                $unwind: "$suppliers" // 展开 suppliers 数组
            },
            {
                $lookup: {
                    from: "Suppliers", // 从 Suppliers 集合中查找
                    localField: "suppliers.supplierId", // 本地字段为供应商 ID
                    foreignField: "_id", // 外部字段为 Supplier 的 ID
                    as: "supplierDetails" // 将查找结果放入 supplierDetails 数组
                }
            },
            {
                $group: {
                    _id: "$_id", // 按产品 ID 分组
                    productName: { $first: "$name" }, // 获取产品名称
                    highestPrice: { $max: "$suppliers.price" }, // 计算最高价格
                    supplierPrice: {
                        $push: {
                            supplierId: "$suppliers.supplierId", // 获取供应商 ID
                            price: "$suppliers.price", // 获取供应商价格
                        }
                    },
                    //supplierName:{$first:"supplierDetails.name"}
                }
            },
            {
                $project: {
                    productName: 1,
                    highestPrice: 1,
                    highestSupplier: {
                        $filter: {
                            input: "$supplierPrice",
                            as: "supplier",
                            cond: { $eq: ["$$supplier.price", "$highestPrice"] } // 筛选出最高价格的供应商
                        }
                    },
                }
            }
        ]);

        console.table(results); // 以表格形式展示结果
    } catch (error) {
        console.error("Error fetching highest price suppliers:", error);
    } finally {
        await mongoose.disconnect(); // 断开数据库连接
    }
};

highestPriceSupplier();