const mongoose = require("mongoose");

const connectDb = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log(`Bd conectada en ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
