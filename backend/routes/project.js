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
        const result = await db.query("INSERT INTO project (" +
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
        );

        // Updating the participant table
        await db.query("INSERT INTO PARTICIPANT (projet, user_id, comite) VALUES ($1, $2, $3)", [result.rows[0].code, responsable, "Responsable"]);

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});


// get /project/:projectID/available-member
//Trouver tout les membres de la bdd qui ne sont PAS deja dans le comité d'un projet
router.get("/:projectID/available-members", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const members = await db.query("SELECT DISTINCT u.user_id, u.nom, u.prenom FROM utilisateur u " +
            "inner join member m on u.user_id = m.user_id where m.user_id NOT IN (" +
            "select p.user_id from participant p where p.projet=$1" +
            " group by p.user_id)", [codeProjet]);
        res.json(members.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get /project/:projectID/available-benevole
//Trouver tout les bénévoles de la bdd qui ne sont PAS deja dans le comité d'un projet
router.get("/:projectID/available-benevoles", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const benevoles = await db.query("SELECT DISTINCT user_id, nom, prenom FROM utilisateur where user_id NOT IN (" +
        "select p.user_id from participant p where p.projet=$1" +
        " group by p.user_id)", [codeProjet]);
        res.json(benevoles.rows);
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
        const { user_id } = req.body;
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
        const { user_id } = req.body;
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
        res.status(500).json({error: error.message});
    }
});

router.post("/:projectID/", async (req, res) =>{
  const projectID = req.params.projectID;
  try {
    const { titre, description, sommaire, statutprojet, debutestime, finestime, budget, totalfondscoll, totaldepense,
      debutreel, debutfin, etatavancement, image } = req.body;

    const result = await db.query("UPDATE PROJECT SET titre =$1, description=$2, sommaire=$3, statutprojet=$4, debutestime=$5, finestime=$6, budget=$7, totalfondscoll=$8, totaldepense=$9," +
      " image=$10, debutreel=$11, debutfin=$12, etatavancement=$13 WHERE code=$14", [titre, description, sommaire, statutprojet, debutestime, finestime, budget, totalfondscoll, totaldepense, image, debutreel, debutfin, etatavancement, projectID]);

    res.json(result.rows);
  } catch (err) {
      console.error(err.message)
  }
});

//Supprimer le projet
router.delete("/:projectID", async (req, res) => {
  const projectID = req.params.projectID;
  console.log('beforeDelete', projectID);
  try {
      await db.query("DELETE FROM participant WHERE projet = $1", [projectID]);
      await db.query("DELETE FROM FUNDRAISING WHERE PROJET = $1", [projectID]);
      const beforeDelete = await db.query("SELECT * FROM PROJECT");
      console.log('beforeDelete', beforeDelete);

      await db.query("DELETE FROM PROJECT WHERE CODE = $1",[projectID]);
      const afterDelete = await db.query("SELECT * FROM PROJECT");
      console.log('afterDelete', afterDelete);

      if(afterDelete.rows.length < beforeDelete.rows.length){
          res.json({check: true});
      } else {
          res.json({check: true});
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).json({error: error.message});
  }
});

// get /project/member
//Afficher tout les membre d'un projet
router.get("/:projectID/members", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const role = 'Membre';
        const participantInfo = await db.query("SELECT Utilisateur.user_id, Utilisateur.nom, UTILISATEUR.PRENOM from UTILISATEUR INNER JOIN participant "
          + "ON participant.user_id=UTILISATEUR.user_id WHERE participant.projet = $1 and participant.comite = $2 ", [codeProjet, role]);
        res.json(participantInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get /project/benevole
//Afficher tout les benevoles d'un projet
router.get("/:projectID/benevoles", async (req, res) => {
    try {
        const codeProjet = req.params.projectID;
        const role = 'Benevole';
        const participantInfo = await db.query("SELECT Utilisateur.user_id, Utilisateur.nom, UTILISATEUR.PRENOM from UTILISATEUR INNER JOIN participant "
          + "ON participant.user_id=UTILISATEUR.user_id WHERE participant.projet = $1 and participant.comite = $2 ", [codeProjet, role]);
        res.json(participantInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Supprimer un participant d'un projet 
router.delete("/:projectId/user/:userId", async (req, res) => {
    try {
        const {projectId, userId} = req.params;
        const deleteParticipant = await db.query("DELETE FROM participant WHERE projet = $1 and user_id = $2", [projectId, userId]);
        res.json(deleteParticipant.rows);
    } catch (err) {
        console.log(err.message);
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
        res.status(500).json({error: error.message});
    }
});


/* GET current campaign for a project */
router.get('/:projectId/campaign', async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const result = await db.query("SELECT * FROM fundraising WHERE projet=$1 AND fin > NOW()", [projectId]);
        if (!result || !result.rowCount) {
            res.json({
                message: "No current campaign",
            });
            return;
        }

        res.json(result.rows[0]);
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

//---------------------User Story 6------------------------------------
//List de projet d'un membre
// Get the list of the project of a certain member with given userID and return the list.
router.get("/myProjects/:userID", async (req, res) => {
    const userID = req.params.userID;
    try {
        const projetInfo = await db.query("SELECT * FROM PROJECT inner join participant on  participant.projet=project.code inner join login on login.user_id=participant.user_id WHERE login.user_id=$1", [userID]);
        res.json(projetInfo.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router;