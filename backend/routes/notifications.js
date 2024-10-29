const express= require('express');
const router= express.Router();
const { protectRoute } = require('../middlewares/protectRoute');
const { getNotifications, deleteNotifications } = require('../controllers/notifications');

router.get('/', protectRoute, getNotifications);
router.delete('/', protectRoute, deleteNotifications);

module.exports = router;