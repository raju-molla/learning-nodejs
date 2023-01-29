const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have name'],
      unique: true,
      trim : true
    },
    duration : {
      type: Number,
      required : [true,'A tour must have duation']
    },
    maxGroupSize: {
      type:Number,
      required: [true, 'A tour must have max graoup']
    },
    difficulty: {
      type: String,
      required : [true, 'A tour must have difficulty']
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price'],
    },
    priceDiscount : Number,
    summary :{
      type:String,
      trim: true,
      required : [true, 'A tour must have summary']
    },
    description: {
      type:String,
      trim : true,
    },
    imageCover : {
      type:String,
      required : [true, 'A tour must have image cover']
    },
    images: [String],
    createAt:{
      type:Date,
      default : Date.now(),
      select : false
    },
    startDates:[Date]




  });
  const Tour = mongoose.model('Tour', tourSchema);
  module.exports = Tour