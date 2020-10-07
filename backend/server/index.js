const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const moment = require("moment");

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
        const linkToLogin = await  pool.query("INSERT INTO login (username, password, user_id) VALUES($1, $2 ,$3)",
            [email, password, newUser.rows[0].user_id]
        );
    } catch (err) {
        if(err.code === 'ER_DUP_ENTRY'){
            console.error(err.message); //TODO Add stronger handling
        }else{
            console.error(err.message);
        }
    }
})

//create  a login
app.post("/login", async (req, res) => {
    try {

        const {username, password, email} = req.body;
        const user_id = await pool.query("SELECT user_id from utilisateur WHERE email = $1", [email]);
        const newLogin = await pool.query("INSERT INTO login (username, password, user_id) VALUES($1, $2 ,$3) RETURNING *",
            [username, password, user_id]
        );
        res.json(newLogin.rows[0]);
    } catch (err) {
        console.error(err.message);
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
app.put("/login/:username/:motdepass", async (req, res) => {
    try {
        const username = req.params.username;
        const motdepass =req.params.motdepass;
        const userInfo = await pool.query("SELECT user_id FROM login WHERE USERNAME=$1 AND PASSWORD=$2",[username, motdepass]);

        if(userInfo.rows.length === 1){
            res.json({check:true, userID:userInfo.rows[0].user_id});
        }else{
            res.json({check:false, userID:0});
        }

    } catch (err) {
        console.error(err.message);
    }
})
// create user space. Get all the value necessary using the username.
app.put("/welcomePage/:userID", async (req, res) =>{
    try {
        const userID = req.params.userID;

        const userInfo = await pool.query("SELECT UTILISATEUR.nom, UTILISATEUR.prenom, UTILISATEUR.user_id, "+
            "member.statutadhesion FROM UTILISATEUR INNER JOIN member ON member.user_id=utilisateur.user_id WHERE utilisateur.user_id=$1", [userID]);
        console.log(userInfo.rows.length);
        res.json(userInfo.rows);
    }catch(err){
        console.error(err.message);
        console.error(err.message);
    }
})

app.put("/userSpace/:userID", async  (req, res) =>{

    try{
        const userID = req.params.userID;
        const userInfo = await pool.query("Select * FROM UTILISATEUR INNER JOIN login ON UTILISATEUR.user_id=login.user_id where login.user_id =$1", [userID]);
        res.json(userInfo.rows);
    }catch(err){
        console.error(err.message);
    }
})

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

//List de projet d'un membre
// Get the list of the project of a certain member with given userID and return the list.

app.put("/userSpaceProjetList/:userID", async (req, res)=> {
    try {
        const userID = req.params.userID;
        const projetInfo = await pool.query ("SELECT * FROM PROJECT inner join participant on  participant.projet=project.code inner join login on login.user_id=participant.user_id WHERE login.user_id=$1" , [userID]);
        res.json(projetInfo.rows);
        console.log(projetInfo.rows.length);
    }catch(err){

        console.error(err.message);
    }
})

//---------------------User Story 7------------------------------------
//Ajouter project

app.put("/ajoutProjet/:titre/:descCourte/:sommaire/:startDate/:endDate/:responsable/:image", async (req, res)=> {
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
        const image = req.params.image;
        const debutreel = moment(req.params.endDate).format("YYYY-MM-DD");
        const debutfin = moment(req.params.endDate).format("YYYY-MM-DD");
        const etatavancement = '';
        const responsable = req.params.responsable;

        // Check if the update is successful. If the difference between number of total project line before and after the commit
        // is one then the commit is successful. If commit is successful, return true, else false

        const oldProjectQuery = await pool.query ("select * from project");
        await pool.query("INSERT INTO project (titre, description, sommaire, debutestime, finestime, statutprojet, budget, totalfondscoll,"+
            "totaldepense, image, debutreel, debutfin, etatavancement, responsable) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
            [titre, descCourte, sommaire, debutestime, finestime, statutprojet, budget, totalfondscoll, totaldepense, image, debutreel, debutfin, etatavancement, responsable])
        // GET THE ID OF CREATED PROJECT

        const projetInfo =await pool.query("SELECT code FROM PROJECT WHERE PROJECT.titre = $1 AND PROJECT.description = $2 AND PROJECT.sommaire = $3", [titre, descCourte, sommaire]);
        const projectID = projetInfo.rows[0].code;

        // Updating the participant table

        await pool.query("INSERT INTO PARTICIPANT (projet, user_id, comite) VALUES ($1, $2, $3)",[projectID, responsable, "Member"]);

        const newProjectQuery = await pool.query("select * from project");
        if (newProjectQuery.rows.length -oldProjectQuery.rows.length === 1){
            res.json(true);
        }else{
            res.json(false);
        }
    }catch(err){
        console.error(err.message);
    }
})

//Trouver tout les membres de la bdd qui ne sont PAS deja dans le comité

app.get("/allMembers", async (req, res) => {
    try {
        const {codeProjet} = req.body;
        const userInfo = await pool.query("SELECT * from member left join participant on member.user_id = participant.user_id " +
            "WHERE participant.projet is null or participant.projet !=$1", [codeProjet]);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})




//Trouver tout les bénévoles de la bdd qui ne sont PAS deja dans le comité

app.get("/allBenevoles", async (req, res) => {
    try {
        const {codeProjet} = req.body;
        const userInfo = await pool.query("SELECT * from utilisateur left join participant on utilisateur.user_id = participant.user_id WHERE participant.projet is null or participant.projet !=$1", [codeProjet]);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Créer un participant (ajouter un membre au comité)
app.post("/AjouterAuComite", async (req, res) => {
    try {

        const {code, user_id, role} = req.body;
        const newComite = await pool.query("INSERT INTO participant (projet, user_id, user_id) VALUES($1, $2 ,$3) RETURNING *",
            [code, user_id, role]
        );
        res.json(newComite.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})


// Detail of a specific project
app.post("/projectDetail:projectID", async (req, res) => {
    try {

        const projectID = req.params.projectID;
        const projectDetail = await pool.query("SELECT * FROM PROJECT WHERE PROJECT.code = $1", [projectID]);
        res.json(projectDetail.rows);
    }catch(err){
        console.error(err.message);
    }
});

//Afficher tout les membre d'un projet

app.get("/VoirMembreProjet", async (req, res) => {
    try {
        const {codeProjet} = req.body;
        const role = 'Membre';
        const participantInfo = await pool.query("SELECT * from participant WHERE projet = $1 and comite = $2 ", [codeProjet, role]);
        res.json(participantInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Afficher tout les benevoles d'un projet

app.get("/VoirBenevoleProjet", async (req, res) => {
    try {
        const {codeProjet} = req.body;
        const role = 'Benevole';
        const participantInfo = await pool.query("SELECT * from participant WHERE projet = $1 and comite = $2 ", [codeProjet, role]);
        res.json(participantInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Supprimer un membre d'un projet


//Supprimer un benevole d'un projet





//create  a member

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








//create a donation


//create foundraising


//get info foundraising


app.listen(5000, () => {

    console.log("server has started on port 5000")
});

