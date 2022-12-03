const router = require('express').Router();

//const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);//ye do line me work kaise ho rha hai
router.use('/users', require('./user'));//what is the use of .use
router.use('/posts', require('./post'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));
router.get('/home',homeController.home);

router.use('/api',require('./api'));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;//by default