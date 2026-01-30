const router = require('express').Router();

const sectionRoutes = require('./sectionRoutes');
const itemRoutes = require('./itemRoutes');
const tagRoutes = require('./tagRoutes');

router.use('/sections', sectionRoutes);
router.use('/items', itemRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
