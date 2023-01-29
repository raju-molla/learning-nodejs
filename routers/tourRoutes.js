const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();
// router.param('id', tourController.cheakID);

// router.param('id', (req, res, next, val) => {
//   console.log(val);
//   next();
// });

router
  .route('/top-5-cheap')
  .get(tourController.alisTour, tourController.getAllTour);

router.route('/tour-star').get(tourController.getTourStar);

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
