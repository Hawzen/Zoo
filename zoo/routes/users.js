var express = require('express');
var router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
