const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../db");
const path = require("path");
const moment = require("moment");
const bcrypt = require('bcrypt');

// Cost factor for encryption algo
const saltRounds = 10;

//middleware
app.use(cors());
app.use(express.json());

// Images
app.get('/images/:name', async (req, res) => {

    res.sendFile(path.join(__dirname, "../images", req.params.name));
})

//ROUTES//
//----------------------User Story 1---------------------------------------
//-Get 3 projets a mettre sur la page principale
app.get("/Accueil", async (req, res) => {
    try {
        // Hard-coded project code
        const projectInfo = await pool.query("SELECT * from project WHERE code between 1 and 3");
        res.json(projectInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//---------------------User Story 2---------------------------------------
//-Get tout les projets pour mettre sur la page projets
app.get("/Projets", async (req, res) => {
    try {
        // Hard-coded project code
        const projectInfo = await pool.query("SELECT * from project");
        res.json(projectInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})


//--------------------User Story 3 et 4------------------------------------
//create  a user
//Il reste a gérer l'erreur dans le cas ou la contrainte de l'email unique est brisé
app.post("/utilisateur", async (req, res) => {
    try {
        const {nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays, password} = req.body;
        const newUser = await pool.query("INSERT INTO utilisateur (nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays) VALUES($1, $2 ,$3 ,$4 ,$5 ,$6 ,$7, $8, $9, $10) RETURNING *",
            [nom, prenom, email, phone, adresse, inscription, codePostal, ville, province, pays]
        );
        res.json(newUser.rows[0]);

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            await pool.query("INSERT INTO login (username, password, user_id) VALUES($1, $2 ,$3)",
                [email, hash, newUser.rows[0].user_id]);
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            console.error(err.message); //TODO Add stronger handling
        } else {
            console.error(err.message);
        }
    }
})

//create  a member
//il va falloir aller chercher le user_id grace a la variable de session
app.post("/utilisateur/membre", async (req, res) => {
    try {
        const {user_id} = req.body;
        const adhesion = new Date();
        const statutAdhesion = "Actif";
        const newMember = await pool.query("INSERT INTO member (user_id, adhesion, statutAdhesion) VALUES($1, $2 ,$3) RETURNING *",
            [user_id, adhesion, statutAdhesion]
        );
        res.json(newMember.rows[0]);
        const hello = "";
    } catch (err) {
        console.error(err.message);
    }
})

//---------------------User Story 5------------------------------------
// User story 5
// Get all the user/passwords to validate the info. If a single row is returned from the query, the user is validate.
// If validated, return true, else, false.
const crypto = require('crypto');


const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}

//Add project


//---------------------User Story 6------------------------------------
//Trouver les compte rendu d'un projet
app.get("/report/:code", async (req, res) => {
    try {
        const codeProjet = req.params.code;
        const reportInfo = await pool.query("SELECT * from report where projet = $1", [codeProjet]);

        res.json(reportInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})


//---------------------User Story 7------------------------------------
//Ajouter project

app.post("/ajoutProjet/:titre/:descCourte/:sommaire/:startDate/:endDate/:responsable", async (req, res) => {
    try {
        const titre = req.params.titre;
        const descCourte = req.params.descCourte;
        const sommaire = req.params.sommaire;
        const debutestime = moment(req.params.startDate).format("YYYY-MM-DD");
        const finestime = moment(req.params.endDate).format("YYYY-MM-DD");
        const statutprojet = 'proposé';
        const budget = 0;
        const totalfondscoll = 0;
        const totaldepense = 0;
        const {image} = req.body;
        console.log(req.body);
        const debutreel = moment(req.params.endDate).format("YYYY-MM-DD");
        const debutfin = moment(req.params.endDate).format("YYYY-MM-DD");
        const etatavancement = '';
        const responsable = req.params.responsable;
        // Check if the update is successful. If the difference between number of total project line before and after the commit
        // is one then the commit is successful. If commit is successful, return true, else false

        const oldProjectQuery = await pool.query("select * from project");
        await pool.query("INSERT INTO project (titre, description, sommaire, debutestime, finestime, statutprojet, budget, totalfondscoll, totaldepense, image, debutreel, debutfin, etatavancement, responsable) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)  RETURNING *",
            [titre, descCourte, sommaire, debutestime, finestime, statutprojet, budget, totalfondscoll, totaldepense, image, debutreel, debutfin, etatavancement, responsable])
        // GET THE ID OF CREATED PROJECT

        const projetInfo = await pool.query("SELECT code FROM PROJECT WHERE PROJECT.titre = $1 AND PROJECT.description = $2 AND PROJECT.sommaire = $3", [titre, descCourte, sommaire]);
        const projectID = projetInfo.rows[0].code;
        // Updating the participant table
        await pool.query("INSERT INTO PARTICIPANT (projet, user_id, comite) VALUES ($1, $2, $3)", [projectID, responsable, "Responsible"]);
        const newProjectQuery = await pool.query("select * from project");
        if (newProjectQuery.rows.length - oldProjectQuery.rows.length === 1) {
            res.json(true);
        } else {
            res.json(false);
        }
    } catch (err) {
        console.error(err.message);
    }
})



//Trouver tout les bénévoles de la bdd qui ne sont PAS deja dans le comité

app.get("/allBenevoles/:projectID", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const userInfo = await pool.query("SELECT DISTINCT (user_id, nom, prenom)FROM utilisateur where user_id NOT IN (" +
            "select p.user_id from participant p where p.projet=1" +
            " group by p.user_id)", [codeProjet]);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// Detail of a specific project
app.get("/projects/:projectID", async (req, res) => {
    try {

        const projectID = req.params.projectID;
        const projectDetail = await pool.query("SELECT * FROM PROJECT WHERE PROJECT.code = $1", [projectID]);
        res.json(projectDetail.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


//get member info

app.get("/member/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const userInfo = await pool.query("SELECT adhesion, statutAdhesion from member WHERE user_id = $1", [id]);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})
