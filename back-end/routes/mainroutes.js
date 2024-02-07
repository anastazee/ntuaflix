const express = require('express');
const multer = require('multer')

const sampleController = require('../controllers/admincontrollers');
const userController = require('../controllers/usercontrollers');
const extraController = require('../controllers/extracontrollers');

const router = express.Router();
const storage = multer.memoryStorage(); // Use memory storage for the uploaded file

const upload = multer({ storage: storage });

router.get('/', sampleController.getSample);
//router.get('/:id', sampleController.getSampleById);
//router.post('/:id', sampleController.postSample);
router.get('/admin/healthcheck', sampleController.getHealthCheck);
router.post('/admin/upload/titlebasics', upload.single('file'), sampleController.postTitleBasics);
router.post('/admin/upload/titleakas', upload.single('file'), sampleController.postTitleAkas);
router.post('/admin/upload/namebasics', upload.single('file'), sampleController.postNameBasics);
router.post('/admin/upload/titlecrew', upload.single('file'), sampleController.postTitleCrew);
router.post('/admin/upload/titleepisode', upload.single('file'), sampleController.postTitleEpisode);
router.post('/admin/upload/titleprincipals', upload.single('file'), sampleController.postTitlePrincipals);
router.post('/admin/upload/titleratings', upload.single('file'), sampleController.postTitleRatings);
router.post('/admin/resetall', sampleController.postResetAll);


router.get('/title/:titleID', userController.getTitleRoute);
router.get('/name/:nameID', userController.getNameRoute);
router.get('/searchtitle', userController.getSearchTitle);
router.post('/searchtitle', userController.getSearchTitle);
router.get('/searchname', userController.getSearchName);
router.post('/searchname', userController.getSearchName);
router.get('/bygenre', userController.getByGenre);
router.post('/bygenre', userController.getByGenre);

router.get('/knownfor/:nameID', extraController.getKnownFor);
router.get('/principalmovies/:nameID', extraController.getPrincipalMovies);
router.get('/top10movies', extraController.gettop10Movies);
router.get('/votes10movies', extraController.getvotes10Movies);
router.get('/director/:titleID', extraController.getDirector);
router.get('/writers/:titleID', extraController.getWriters);
router.get('/titleprincipals/:titleID', extraController.getTitlePrincipals);
router.get('/genres', extraController.getAllGenres);
module.exports = router;