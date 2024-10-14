const express = require('express');
const router = express.Router();

//    Route:        /api/auth/

router.get('/', (req, res) => {
    res.send("Welcome here!");
});


module.exports = router;

