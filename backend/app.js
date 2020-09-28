const express = require('express');
//const mountRoutes = require('./routes');
const path = require("path");
const cors = require("cors");



/* Le fichier '.env' n'est pas inclus dans le repo, puisqu'il contient
*  les infos relative a la connection de la db. */
const app = express();
//mountRoutes(app);


//middleware
app.use(cors());
app.use(express.json());

// serve static files built by React
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// How to listen to incoming
app.listen(3000);
