'use strict';

require('dotenv').config();
const express = require('express');
const {
  Link,
  Alias,
  QRCode
} = require('../../../model');
const {
  handleAuth,
  findUserLinks,
  handleAnalytics,
  handleBatchAnalytics,
  handleEncoding,
} = require('../../middleware');
const { 
  handleGet,
  handlePost,
  handleDelete,
} = require('../handlers');

const router = express.Router();
router.get('/link', handleAuth(true), handleGet(Link));
router.post('/link', handleAuth(false), handlePost(Link));
router.delete('/link/:id', handleAuth(true), handleDelete(Link));

router.get('/alias', handleAuth(true), handleGet(Alias));
router.post('/alias', handleAuth(true), handlePost(Alias));
router.delete('/alias/:id', handleAuth(true), handleDelete(Alias));

router.get('/qrcode', handleAuth(true), handleGet(QRCode));
router.post('/qrcode', handleAuth(true), handlePost(QRCode));
router.delete('/qrcode/:id', handleAuth(true), handleDelete(QRCode));

router.get('/analytics', handleAuth(true), findUserLinks, handleBatchAnalytics);
router.get('/analytics/:encoding', handleAuth(true), handleEncoding, handleAnalytics);

module.exports = router;