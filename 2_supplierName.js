//2_supplierName.js
const mongoose = require("mongoose");
const Sale = require('./models/saleModel');
const Product = require('./models/productModel');
const Supplier = require('./models/supplierModel'); // 确保路径正确
const connectDb = require('./dbConnection'); 

const supplierName = async () => {
    await connectDb(); // 连接数据库
  
    try {
        // 筛选2021年的销售订单
        const sales2021 = await Sale.find({
            date: {
                $gte: new Date("2021-01-01"),
                $lt: new Date("2022-01-01")
            }
        }).populate('productsSold.productId'); 

        // 提取产品 ID
        const productIds = sales2021.flatMap(sale => 
            sale.productsSold.map(productSold => productSold.productId)
        );

        // 获取对应的产品信息
        const products = await Product.find({
            _id: { $in: productIds },
            name: { $in: ["Printer", "Computer"] }
        });
        //console.log(products);
        
        // 提取供应商 ID
        const supplierIds = [...new Set(products.flatMap(product => product.suppliers.map(supplier => supplier.supplierId)))];
        //console.log(supplierIds);

        // 获取供应商信息
        const suppliers = await Supplier.find({ _id: { $in: supplierIds } });
        
        // 输出供应商信息
        console.log(suppliers.map(supplier => supplier.name));
    } catch (error) {
        console.error("Error fetching suppliers:", error);
    } finally {
        await mongoose.disconnect(); // 断开数据库连接
    }
};

supplierName(); // 调用函数