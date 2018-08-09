const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const mustacheView = process.env.EXPRESS_BASE_PATH.replace(/^\/+/, '');
  return res.render(mustacheView);
});

module.exports = router;
