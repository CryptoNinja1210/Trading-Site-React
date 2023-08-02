const mongoose = require('mongoose');
const config = require('config');
const db = config.get('localMongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    console.log('MongoDB connection error')
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;