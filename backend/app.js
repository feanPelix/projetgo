const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const mountRoutes = require('./routes');
mountRoutes(app);

app.listen(5000, () => {
    console.log("server has started on port 5000 ok")
});
