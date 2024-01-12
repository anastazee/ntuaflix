const express = require('express');
const multer = require('multer')

const sampleController = require('../controllers/admincontrollers');

const router = express.Router();
const storage = multer.memoryStorage(); // Use memory storage for the uploaded file

const upload = multer({ storage: storage });

router.get('/', sampleController.getSample);
router.get('/:id', sampleController.getSampleById);
router.post('/:id', sampleController.postSample);
router.get('/admin/healthcheck', sampleController.getHealthCheck);
router.post('/admin/upload/titlebasics', upload.single('file'), sampleController.postTitleBasics);
router.post('/admin/upload/titleakas', upload.single('file'), sampleController.postTitleAkas);
router.post('/admin/upload/namebasics', upload.single('file'), sampleController.postNameBasics);

module.exports = router;

