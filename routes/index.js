const router = require("express").Router();

const apiRoutes = require('./api');

// use routes in '/api' folder with the '/api' prefix
router.use('/api', apiRoutes);

module.exports = router;
