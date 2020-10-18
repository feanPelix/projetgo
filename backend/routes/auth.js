const Router = require('express-promise-router');
const bcrypt = require('bcrypt');
const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();



// Login
//old -> app.post("/login", async (req, res) => {
router.post("/", async (req, res) => {
    /*Attention !
    * Il n'y a aucune validation/sanitation d'input. Requete a risque d'injection.*/
    console.log(req.body);

    const username = req.body.username;
    console.log(username);
    try {
        const cred = await db.query("SELECT password, user_id FROM login WHERE USERNAME=$1", [username]);

        bcrypt.compare(req.body.password, cred.rows[0].password, async (err, result) => {
            if (result) {
                res.json({check: true, userID: cred.rows[0].user_id});
            } else {
                res.json({check: false, userID: 0});
            }
        });
    } catch (err) {
        console.error(err.message);
    }
});

// export our router to be mounted by the parent application
module.exports = router;