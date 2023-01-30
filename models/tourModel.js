const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have name'],
      unique: true,
      trim: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have duation'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have max graoup'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty'],
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
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have image cover'],
    },
    images: [String],
    createAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOUCMENTS MIDDLWARE SAVES BEFORE .save and .create or insertmany

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre('save', (next) => {
  console.log('will save documents');
  next();
});

tourSchema.post('save', (doc, next) => {
  console.log(doc);
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
