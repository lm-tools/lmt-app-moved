const express = require('express');
const router = new express.Router();

const renderStaticView = (staticView, req, res, next, model = {}) =>
  res.render(`static_${staticView}`, model, (err, html) => {
    if (err) {
      // allow 404 to be generated from error middleware
      next();
    } else {
      res.status(200).send(html);
    }
  });

/**
 *`
 *
 * @param staticView[opt] - the view to return in views/static_<viewname>.mustache.
 * If not set, will expose every static view at ${basePath}/:view.
 * @returns {express.Router}
 */
module.exports = (staticView, basePath) => {
  if (!staticView) {
    /* GET specified view */
    router.get('/:view', (req, res, next) => renderStaticView(req.params.view, req, res, next));
  } else {
    /* GET home page. */
    router.get('/', (req, res, next) => renderStaticView(staticView, req, res, next));
    router.get('*', (req, res) => res.redirect(basePath || '/'));
  }
  return router;
};
