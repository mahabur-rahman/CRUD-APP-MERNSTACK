const mongoose = require("mongoose");
const DB = process.env.DATABASE;

// connect with db

const connectedDB = async () => {
  try {
    const conn = await mongoose.connect(DB, {
      useUnifiedTopology: false,
      useNewUrlParser: true,
    });

    console.log(
      `Mongodb connected successfully : ${conn.connection.host}`.cyan.underline
    );
  } catch (err) {
    console.log(`No connection : ${err}`);
    process.exit(1);
  }
};

// exports
module.exports = connectedDB;
