import Router from 'express-promise-router';
import db from '../db';

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();


router.get('/', async (req, res) => {
    res.send('Projects');
});

// export our router to be mounted by the parent application
module.exports = router;