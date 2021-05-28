const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    nama: String, // String is shorthand for {type: String}
    age: String,
    job: String,
    gender: String,
    nomor: String,
    address: String,
    disease: String,
    path: String,
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", blogSchema);

module.exports = Customer;
