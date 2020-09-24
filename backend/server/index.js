const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//usertStory 1
//-Get


//create  a user
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
//get user info
app.get("/utilisateur/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = await pool.query("SELECT * from utilisateurs WHERE user_id = $1", [id]);
        res.json(userInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get login info
app.get("/connect/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const userLogin = await pool.query("SELECT password from login WHERE username = $1", [username]);
        res.json(userLogin.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//create  a member

//get member info

app.get("/member/:id", async (req, res) => {
    try {
        const { id } = req.params;
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

