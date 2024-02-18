const express = require('express');
const multer = require('multer')

const sampleController = require('../controllers/admincontrollers');
const userController = require('../controllers/usercontrollers');
const extraController = require('../controllers/extracontrollers');

const router = express.Router();
const storage = multer.memoryStorage(); // Use memory storage for the uploaded file

const upload = multer({ storage: storage });

router.get('/ntuaflix_api/', sampleController.getSample);
router.get('/ntuaflix_api/admin/healthcheck', sampleController.getHealthCheck);
router.post('/ntuaflix_api/admin/upload/titlebasics', upload.single('file'), sampleController.postTitleBasics);
router.post('/ntuaflix_api/admin/upload/titleakas', upload.single('file'), sampleController.postTitleAkas);
router.post('/ntuaflix_api/admin/upload/namebasics', upload.single('file'), sampleController.postNameBasics);
router.post('/ntuaflix_api/admin/upload/titlecrew', upload.single('file'), sampleController.postTitleCrew);
router.post('/ntuaflix_api/admin/upload/titleepisode', upload.single('file'), sampleController.postTitleEpisode);
router.post('/ntuaflix_api/admin/upload/titleprincipals', upload.single('file'), sampleController.postTitlePrincipals);
router.post('/ntuaflix_api/admin/upload/titleratings', upload.single('file'), sampleController.postTitleRatings);
router.post('/ntuaflix_api/admin/resetall', sampleController.postResetAll);


router.get('/ntuaflix_api/title/:titleID', userController.getTitleRoute);
router.get('/ntuaflix_api/name/:nameID', userController.getNameRoute);
router.get('/ntuaflix_api/searchtitle', userController.getSearchTitle);
router.post('/ntuaflix_api/searchtitle', userController.getSearchTitle);
router.get('/ntuaflix_api/searchname', userController.getSearchName);
router.post('/ntuaflix_api/searchname', userController.getSearchName);
router.get('/ntuaflix_api/bygenre', userController.getByGenre);
router.post('/ntuaflix_api/bygenre', userController.getByGenre);

router.get('/ntuaflix_api/knownfor/:nameID', extraController.getKnownFor);
router.get('/ntuaflix_api/principalmovies/:nameID', extraController.getPrincipalMovies);
router.get('/ntuaflix_api/top10movies', extraController.gettop10Movies);
router.get('/ntuaflix_api/votes10movies', extraController.getvotes10Movies);
router.get('/ntuaflix_api/director/:titleID', extraController.getDirector);
router.get('/ntuaflix_api/writers/:titleID', extraController.getWriters);
router.get('/ntuaflix_api/titleprincipals/:titleID', extraController.getTitlePrincipals);
router.get('/ntuaflix_api/genres', extraController.getAllGenres);
module.exports = router;