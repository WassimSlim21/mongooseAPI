var express = require('express');
var router = express.Router();
var packCtl = require("../controllers/pack");
/* GET packs listing. */
router.get('/all',packCtl.getAllPacks);
/* add Pack. */
router.post('/add',packCtl.addPack);
router.post('/addMultiple',packCtl.addMultiplePack);

module.exports = router;
