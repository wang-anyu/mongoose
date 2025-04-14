const connectDb = require("./dbConnection");
const Product = require("./models/productModel");

async function getSupplier() {
    const prod1 = await Product.
        findOne({ name: 'Printer' }).
        populate('suppliers.supplierId').
        exec();

    console.log(JSON.stringify(prod1, null, 2));
}

connectDb();

getSupplier();