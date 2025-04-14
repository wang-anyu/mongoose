const mongoose = require("mongoose");

const CONNECTION_STRING = 'mongodb://dev:dev@192.168.11.119:27017/WangShanniDB'

const connectDb = async () => {
  try {
    console.log(CONNECTION_STRING);

    const connect = await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true
    });

    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.error("Execution error :",err);
    process.exit(1);
  }
};

module.exports = connectDb;
//connectDb();
