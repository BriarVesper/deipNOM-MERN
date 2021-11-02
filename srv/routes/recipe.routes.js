let express = require('express'),
    router = express.Router();

let recipe = require('../models/recipe-schema');

router.route('/').get((req, res) => {
  recipe.find((error, data) => {
    if (error) return next(error);
    else res.json(data);
  });
});

router.route('/create').post((req, res, next) => {
  console.log(req.body);
  recipe.create(req.body.recipe, (error, data) => {
    if (error) return next(error);
    else {
      console.log(data);
      res.json(data);
    }
  })
});

router.route('/:id').delete((req, res, next) => {
  recipe.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) return next(error)
    else {
      console.log(data);
      res.json(data);
    }
  })
});

router.route('/edit').post((req, res, next) => {
  console.log(req.body);
  recipe.findByIdAndUpdate({_id: req.body.recipe._id}, req.body.recipe, {new: true}, (error, data) => {
    if (error) return next(error);
    else {
      console.log(data);
      res.json(data);
    }
  })
});

module.exports = router;