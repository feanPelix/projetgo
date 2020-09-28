const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//----------------------User Story 1---------------------------------------
//-Get 3 projets a mettre sur la page principale
app.get("/Accueil", async (req, res) => {
    try {
        const {id} = req.params;
        const projectInfo = await pool.query("SELECT * from project WHERE user_id = $1 && $2 && $3 ", [1, 2, 3]);
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
app.post("/utilisateur", async (req, res) => {
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
//get login info (Pour se Connecter)
//Dans le front-end il faudra vérifier que le password entré est bien le meme
// que celui retourneé par la base de donnée
//Si une erreur (donc aucun password) est retourner cela voudra dire que le username n'est pas valide, il faudra le signaler
app.get("/connect/:username", async (req, res) => {
    try {
        const {username} = req.params;
        const userLogin = await pool.query("SELECT password from login WHERE username = $1", [username]);
        res.json(userLogin.rows);
    } catch (err) {
        console.error(err.message);
    }
})


//-------Autres----------
//get user info (Afficher les infos de son profil)
app.get("/utilisateur/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const userInfo = await pool.query("SELECT * from utilisateurs WHERE user_id = $1", [id]);
        res.json(userInfo.rows);
    } catch (err) {
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


//create login info


//get login info


//create a donation


//create foundraising


//get info foundraising


app.listen(5000, () => {
    console.log("server has started on port 5000")
});

