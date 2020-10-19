const Router = require('express-promise-router');
const bcrypt = require('bcrypt');
const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();


// Cost factor for encryption algo
const saltRounds = 12;


//--------------------User Story 3 et 4------------------------------------
// Creation d'un utilisateur
// TODO Il reste a gérer l'erreur dans le cas ou la contrainte de l'email unique est brisé
router.post("/", async (req, res) => {
    try {
        // Creation utilisateur
        const {nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays, password} = req.body;
        const newUser = await db.query("INSERT INTO utilisateur (nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays) VALUES($1, $2 ,$3 ,$4 ,$5 ,$6 ,$7, $8, $9, $10) RETURNING *",
          [nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays]
        );

        // Creation des credentials
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            await db.query("INSERT INTO login (username, password, user_id) VALUES($1, $2 ,$3)",
              [email, hash, newUser.rows[0].user_id]);
        });

        res.json(newUser.rows[0]);

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            console.error(err.message); //TODO Add stronger handling
        } else {
            console.error(err.message);
        }
    }
});

router.post("/memberCreation", async (req, res) => {
    try {
        const {userID, date, statusAd} = req.body;

        const userInfo = await db.query("INSERT INTO member (user_id, adhesion, statutadhesion) VALUES ($1, $2 ,$3)",
            [userID, date, statusAd]);
        //console.log(userInfo.rows.length);
    } catch (err) {
        console.error(err.message);
    }
});


// get /user/:id
// return user.name, user.prenom, user.user_id et member.statutadhesion
// create user space. Get all the value necessary using the username.
//app.put("/:id", async (req, res) => {
router.get("/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;

        const userInfo = await db.query("SELECT * FROM UTILISATEUR INNER JOIN member ON member.user_id=utilisateur.user_id WHERE utilisateur.user_id=$1", [userID]);
        //console.log(userInfo.rows.length);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});


// get /member/:memberID/project
//List de projet d'un membre
// Get the list of the project of a certain member with given userID and return the list.
//app.put("/userSpaceProjetList/:userID", async (req, res) => {
router.get("/:userID/project", async (req, res) => {
    try {
        const userID = req.params.userID;
        const projetInfo = await db.query("SELECT * FROM PROJECT " +
          "inner join participant on participant.projet=project.code " +
          "WHERE participant.user_id=$1", [userID]);
        res.json(projetInfo.rows);
        //console.log(projetInfo.rows.length);
    } catch (err) {
        console.error(err.message);
    }
})


// export our router to be mounted by the parent application
module.exports = router;