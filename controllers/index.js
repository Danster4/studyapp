const router = require('express').Router();

const dashboardRoutes = require('./dashboard-routes');
const groupRoutes = require('./groupPage-routes');
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/group', groupRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;