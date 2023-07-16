var express = require('express');
const router = express.Router();
const { register, collectDefaultMetrics } = require('prom-client');

collectDefaultMetrics();

router.get("/", async (req, res) => {
    res.end(await register.metrics());
});

module.exports = router;