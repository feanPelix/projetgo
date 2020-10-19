const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

// get /report/:code
//Trouver les compte rendu d'un projet
//app.get("/report/:code", async (req, res) => {
router.get("/:code", async (req, res) => {
  try {
    const codeProjet = req.params.code;
    const reportInfo = await db.query("SELECT * from report where projet = $1", [codeProjet]);

    res.json(reportInfo.rows);
  } catch (err) {
    console.error(err.message);
  }
})

module.exports = router;