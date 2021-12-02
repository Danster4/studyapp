const router = require('express').Router();

const groupRoutes = require('./groupPage-routes');
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/group/', groupRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;