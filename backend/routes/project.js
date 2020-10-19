const Router = require('express-promise-router');
const moment = require('moment');
const db = require('../db');

const router = new Router();

//----------------------User Story 1---------------------------------------
//-Get 3 projets a mettre sur la page principale
router.get("/top3", async (req, res) => {
    try {
        // Hard-coded project code
        const projectInfo = await db.query("SELECT * from project WHERE code between 1 and 3");
        res.json(projectInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//---------------------User Story 2---------------------------------------
//-Get tout les projets pour mettre sur la page projets
router.get("/", async (req, res) => {
    try {
        // Hard-coded project code
        const projectInfo = await db.query("SELECT * from project");
        res.json(projectInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//---------------------User Story 7------------------------------------
//Ajouter project
//app.post("/ajoutProjet/:titre/:descCourte/:sommaire/:startDate/:endDate/:responsable", async (req, res) => {
router.post("/", async (req, res) => {
    try {
        const {titre, descCourte, sommaire, startDate, endDate, responsable, image} = req.body;
        const debutestime = moment(startDate).format("YYYY-MM-DD");
        const finestime = moment(endDate).format("YYYY-MM-DD");
        const statutprojet = 'proposé';
        const budget = 0;
        const totalfondscoll = 0;
        const totaldepense = 0;
        console.log(req.body);
        const debutreel = moment(endDate).format("YYYY-MM-DD");
        const debutfin = moment(endDate).format("YYYY-MM-DD");
        const etatavancement = '';
        // Check if the update is successful. If the difference between number of total project line before and after the commit
        // is one then the commit is successful. Return if the commit is successful.

        // Insert new project
        const projectID = await db.query("INSERT INTO project (" +
          "titre, " +
          "description, " +
          "sommaire, " +
          "debutestime, " +
          "finestime, " +
          "statutprojet, " +
          "budget, " +
          "totalfondscoll, " +
          "totaldepense, " +
          "image, " +
          "debutreel, " +
          "debutfin, " +
          "etatavancement, " +
          "responsable" +
          ") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)  RETURNING code",
          [titre, descCourte, sommaire, debutestime, finestime, statutprojet, budget, totalfondscoll, totaldepense, image, debutreel, debutfin, etatavancement, responsable]
        ).rows[0].code;

        // Updating the participant table
        await db.query("INSERT INTO PARTICIPANT (projet, user_id, comite) VALUES ($1, $2, $3)", [projectID, responsable, "Responsable"]);

        res.sendStatus(200);
    } catch (err) {
        console.error(err.message);
    }
});


// get /project/:projectID/available-member
//Trouver tout les membres de la bdd qui ne sont PAS deja dans le comité d'un projet
router.get("/:projectID/available-member", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const userInfo = await db.query("SELECT (u.user_id, u.nom, u.prenom)FROM utilisateur u " +
          "inner join member m on u.user_id = m.user_id where m.user_id NOT IN (" +
          "select p.user_id from participant p where p.projet=$1)", [codeProjet]);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get /project/:projectID/available-benevole
//Trouver tout les bénévoles de la bdd qui ne sont PAS deja dans le comité d'un projet
router.get("/:projectID/available-benevole", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const userInfo = await db.query(
          "SELECT (user_id, nom, prenom)FROM utilisateur " +
                "WHERE user_id NOT IN (" +
                    "SELECT p.user_id FROM participant p WHERE p.projet=$1" +
                ")", [codeProjet]);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// TODO REQUETE PAS TROUVÉE DANS LE FRONTEND !!!
// post /project/:projectID/member
// Ajouter un membre au comité d'un projet. (creer un participant)
router.post("/:projectID/member", async (req, res) => {
    try {
        const code = req.params.projectID;
        const user_id = req.body.user_id;
        const role = "Membre"
        const newComite = await db.query("INSERT INTO participant (projet, user_id, comite) VALUES($1, $2 ,$3) RETURNING *",
          [code, user_id, role]
        );
        res.json(newComite.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// TODO REQUETE PAS TROUVÉE DANS LE FRONTEND !!!
// post /project/:projectID/comity/benevole
// Ajouter un benevole au comité d'un projet. (creer un participant)
router.post("/:projectID/benevole", async (req, res) => {
    try {
        const code = req.params.projectID;
        const user_id = req.body.user_id;
        const role = "Benevole"
        const newComite = await db.query("INSERT INTO participant (projet, user_id, comite) VALUES($1, $2 ,$3) RETURNING *",
          [code, user_id, role]
        );
        res.json(newComite.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get /project/
// Detail of a specific project
router.get("/:projectID", async (req, res) => {
    try {
        const projectID = req.params.projectID;
        const projectDetail = await db.query("SELECT * FROM PROJECT WHERE PROJECT.code = $1", [projectID]);
        res.json(projectDetail.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


// get /project/member
//Afficher tout les membre d'un projet
router.get("/:projectID/member", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const role = 'Member';
        const participantInfo = await db.query("SELECT Utilisateur.nom, UTILISATEUR.PRENOM from UTILISATEUR INNER JOIN participant "
          + "ON participant.user_id=UTILISATEUR.user_id WHERE participant.projet = $1 and participant.comite = $2 ", [codeProjet, role]);
        res.json(participantInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get /project/benevole
//Afficher tout les benevoles d'un projet
router.get("/:projectID/benevole", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const role = 'benevole';
        const participantInfo = await db.query("SELECT Utilisateur.nom, UTILISATEUR.PRENOM from UTILISATEUR INNER JOIN participant "
          + "ON participant.user_id=UTILISATEUR.user_id WHERE participant.projet = $1 and participant.comite = $2 ", [codeProjet, role]);
        res.json(participantInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//create a donation
/*POST new fundraising */
router.post('/:projectId/campaign', async (req, res) => {
    //Check data received
    const errors = [];

    if (!req.body.begin) {
        errors.push('No start date provided');
    }

    if (!req.body.end) {
        errors.push('No end date provided');
    }

    if (!req.body.goal) {
        errors.push('No amount provided');
    }

    //Create new campaign
    const newCampaign = {
        projectId: req.body.projectId,
        start: req.body.start,
        end: req.body.end,
        goal: req.body.goal
    };

    const sql = 'INSERT INTO fundraising (projet, debut, fin, objectif) VALUES ($1,$2,$3,$4)';
    const params = Object.keys(newCampaign).map((key) => {
        return newCampaign[key];
    });

    try {
        await db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({error: err.message});
                return;
            }
            res.json({
                message: "success",
                campaign: {
                    ...newCampaign,
                    id: this.lastID,
                },
            });
        });
    } catch (error) {

    }
});


/* GET current campaign for a project */
router.get('/:projectId/campaign', async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const result = await db.query("SELECT * FROM fundraising WHERE projet = $1 AND fin > NOW()", [projectId]);
        if (!result || !result.rowCount) {
            res.json({
                message: "No current campaign",
                campaign: null,
            });
            return;
        }

        res.json({
            message: "Campaign found",
            campaign: result.rows[0]
        });
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});


/* GET donations for a project */
router.get('/:projectId/donations', async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const result = await db.query("SELECT * FROM don WHERE fundraising IN (SELECT fundraising_id FROM fundraising WHERE projet = $1)", [projectId]);
        if (!result || !result.rowCount) {
            res.json({
                message: "No Donations",
                donations: [],
            });
            return;
        }

        res.json({
            message: "Donations found",
            donations: result.rows[0]
        });
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});


module.exports = router;
