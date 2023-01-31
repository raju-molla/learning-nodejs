const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less then 40 character!'],
      minlength: [10, 'A tour name must greater then 10 character!'],
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: `difficulty will be : "easy", "medium", "difficult"`,
      },
    },

    secrateTour: {
      type: Boolean,
      default: false,
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5.0, 'A tour rating Average must less then or egual 5.0 '],
      min: [1.0, 'A tour rating Average must greater then or egual 1.0 '],
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

// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// tourSchema.pre('save', (next) => {
//   console.log('will save documents');
//   next();
// });

// tourSchema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secrateTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query Time need - ${Date.now() - this.start} millisecond`);
  console.log(docs);
  next();
});

// AGGREGATION MIDLLEWARE

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secrateTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
