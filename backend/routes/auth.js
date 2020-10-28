const Router = require('express-promise-router');
const bcrypt = require('bcrypt');
const db = require('../db');
const crypto = require('crypto');

const router = new Router();

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

const authTokens = {};

// Login
router.post("/", async (req, res) => {
    /*Attention !
    * Il n'y a aucune validation/sanitation d'input. Requete a risque d'injection.*/
    const { username, password } = req.body;
    let login;
    
    try {
      //Find the login
      login = await db.query("SELECT password, user_id FROM login WHERE USERNAME=$1", [username]);
    } catch (err) {
      console.error(err.message);
    }
    
    if (!login || !login.rowCount) {
      res.status(401).json({
            message: 'Invalid username or password',
        });
        return;
    }

    const userLogin = {
        userID: login.rows[0].user_id,
        username: login.rows[0].username,
        password: login.rows[0].password,
    };

    //Check Password
    let authToken;
    bcrypt.compare(password, userLogin.password, async (err, result) => {
        if (!result) {
            res.status(401).json({
                message: 'Invalid username or password',
            });
            return;
        }

        authToken = generateAuthToken();
        authTokens[authToken] = userLogin;
    });

    // TODO find user
    try {
        const user = await db.query("SELECT * FROM utilisateur WHERE user_id=$1", [userLogin.userID]);
        const member = await db.query("SELECT * FROM member WHERE user_id = $1", [userLogin.userID]);
        res.cookie('Authtoken', authToken).json({
            user: user.rows[0],
            member: member.rows[0],   
        });
    } catch (err) {
        console.error(err.message);
    }
});

// export our router to be mounted by the parent application
module.exports = router;