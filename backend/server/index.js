const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const moment = require("moment");

//middleware
app.use(cors());
app.use(express.json());

// serve static files built by React
app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

//ROUTES//

//----------------------User Story 1---------------------------------------
//-Get 3 projets a mettre sur la page principale
app.get("/Accueil", async (req, res) => {
    try {
        // Hard-coded project code
        const projectInfo = await pool.query("SELECT image, titre, description from project WHERE code between 1 and 3");
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
            const projectInfo = await pool.query("SELECT image, titre, description from project");
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

        const {nom, prenom, email, phone, adresse, inscription} = req.body;
        const newUser = await pool.query("INSERT INTO utilisateur (nom, prenom, email, phone, adresse, inscription) VALUES($1, $2 ,$3 ,$4 ,$5 ,$6) RETURNING *",
            [nom, prenom, email, phone, adresse, inscription]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
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
        const userInfo = await pool.query("SELECT * FROM login WHERE USERNAME=$1 AND PASSWORD=$2",[username, motdepass]);

        if(userInfo.rows.length === 1){
            res.json(true);
        }else{
            res.json(false);
        }

    } catch (err) {
        console.error(err.message);
    }
})
// create user space. Get all the value necessary using the username.
app.put("/login/:username", async (req, res) =>{
    try {
        const username = req.params.username;
        console.log(username);
        const userInfo = await pool.query("SELECT utilisateur.nom, utilisateur.prenom, utilisateur.user_id, member.statutadhesion FROM utilisateur INNER JOIN login ON login.user_id=utilisateur.user_id INNER JOIN member ON member.user_id = login.user_id WHERE login.username=$1", [username]);

        res.json(userInfo.rows);
    }catch(err){
        console.error(err.message);
    }
})

app.put("/userSpace/:userID", async  (req, res) =>{

    try{
        const userID= req.params.userID;
        const userInfo = await pool.query("Select * FROM UTILISATEUR INNER JOIN login ON UTILISATEUR.user_id=login.user_id where login.username =$1", [userID]);
        res.json(userInfo.rows);
        console.log(userInfo.rows.length);
    }catch(err){
        console.error(err.message);
    }
})

//Add project


//---------------------User Story 6------------------------------------
//Trouver les compte rendu d'un projet
app.get("/Rapports/:code", async (req, res) => {
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
        const debutreel = moment(req.params.endDate).format("YYYY-MM-DD");;
        const debutfin = moment(req.params.endDate).format("YYYY-MM-DD");;
        const etatavancement = '';
        const responsable = req.params.responsable;


        // Query to get the userID

        const getUserID = await pool.query ("select user_id from login where username = $1", [responsable]);
        const userID = getUserID.rows[0].user_id;

        // Check if the update is successful. If the difference between number of total project line before and after the commit
        // is one then the commit is successful. If commit is successful, return true, else false

        const oldProjectQuery = await pool.query ("select * from project");
        const newProject = await pool.query("INSERT INTO project (titre, description, sommaire, debutestime, finestime, statutprojet, budget, totalfondscoll, totaldepense, image, debutreel, debutfin, etatavancement, responsable) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)", [titre, descCourte, sommaire, debutestime, finestime, statutprojet, budget, totalfondscoll, totaldepense, image, debutreel, debutfin, etatavancement, userID])
        const newProjectQuery = await pool.query("select * from project");
        console.log (oldProjectQuery.rows.length);
        console.log (newProjectQuery.rows.length);
        if (newProjectQuery.rows.length -oldProjectQuery.rows.length === 1){
            res.json(true);
        }else{
            res.json(false);
        }
    }catch(err){
        console.error(err.message);
    }
})

//List de projet d'un membre
// Get the list of the project of a certain member with given userID and return the list.

app.put("/userSpaceProjetList/:userID", async (req, res)=> {
    try {
        const userID = req.params.userID;

        const projetInfo = await pool.query ("SELECT * FROM PROJECT inner join login on login.user_id=project.responsable WHERE login.username=$1", [userID]);
        res.json(projetInfo.rows);
        console.log(projetInfo.rows);
    }catch(err){
        console.error(err.message);
    }
})








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

