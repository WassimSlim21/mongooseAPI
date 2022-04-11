var express = require('express');
var router = express.Router();
var packCtl = require("../controllers/pack");
const auth = require('../middleware/auth');

/* GET packs listing. */
router.get('/all',auth,packCtl.getAllPacks);
/* add Pack. */
router.post('/add',auth,packCtl.addPack);
router.post('/addMultiple',auth,packCtl.addMultiplePack);

module.exports = router;
