const express = require('express');
const router = new express.Router();

const renderStaticView = (req, res, next, model = {}) =>
  res.render(`static_${req.params.view}`, model, (err, html) => {
    if (err) {
      next();
    } else {
      res.status(200).send(html);
    }
  });

module.exports = viewsWhitelist => {
  if (!viewsWhitelist || viewsWhitelist.length < 1) {
    /* GET home page. */
    router.get('/:view', (req, res, next) => renderStaticView(req, res, next));
  } else {
    /* GET home page. */
    router.get('/:view', (req, res, next) => {
      if (viewsWhitelist.includes(req.params.view)) {
        return renderStaticView(req, res, next);
      }
      return next();
    });
  }
  return router;
};
