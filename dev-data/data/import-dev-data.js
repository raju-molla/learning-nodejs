const fs = require('fs');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connection successfully!');
  });

//   READ JSON DATA FROM FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA FROM DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data import successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// DELETE DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleted!!!!!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
