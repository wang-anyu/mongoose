//4_totalMoreSupplier.js
const mongoose = require("mongoose");
const Sale = require('./models/saleModel');
const Product = require('./models/productModel');
const Supplier = require('./models/supplierModel'); // 确保路径正确
const connectDb = require('./dbConnection'); 

const totalMoreSupplier = async () => {
    await connectDb();

    try {
        const suppliers = await Product.aggregate([
            {
                $unwind: "$suppliers" // 展开供应商数组
            },
            {
                $lookup: {
                    from: "Suppliers",
                    localField: "suppliers.supplierId",
                    foreignField: "_id",
                    as: "supplierDetails"
                }
            },
            {
                $unwind: "$supplierDetails"
            },
            {
                $group: {
                    _id: "$supplierDetails._id", // 按供应商 ID 分组
                    totalValue: { $sum: { $multiply: ["$suppliers.price", "$stock"] } }, // 计算总金额
                    name: { $first: "$supplierDetails.name" }, // 获取供应商名称
                    phoneNumber: { $first: "$supplierDetails.phoneNumber" }, // 获取供应商电话
                    address: {$first:"$supplierDetails.address"}
                }
            },
            {
                $match: { totalValue: { $gt: 70000 } }
            }
        ]);

        console.log("High Value Suppliers:", suppliers);
    } catch (error) {
        console.error("Error fetching high value suppliers:", error);
    } finally {
        await mongoose.disconnect();
    }
};

totalMoreSupplier();