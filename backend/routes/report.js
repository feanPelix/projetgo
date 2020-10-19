const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

//Trouver les compte rendu d'un projet
router.get("/:code", async (req, res) => {
  try {
    const codeProjet = req.params.code;
    const reportInfo = await db.query("SELECT * from report where projet = $1", [codeProjet]);
    res.json(reportInfo.rows);
  } catch (err) {
    res.status(500).json({error: err.message});
    console.error(err.stack);
  }
});

// Delete un report
router.delete('/:id', async (req, res) => {
  try {
    const reportID = req.params.id;
    await db.query("DELETE FROM report WHERE id=$1", [reportID]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({error: err.message});
    console.error(err.stack);
  }
});

// Modif d'un report
router.put('/:id', async (req, res) => {
  try {
    const {update, completed, reported, etatrisque} = req.body;
    await db.query('UPDATE report SET update=$2, completed=$3, reported=$4, etatrisque=$5 WHERE id=$1',
      [req.params.id, update, completed, reported, etatrisque]);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({error: err.message});
    console.error(err.stack);
  }
});

// Ajout d'un report
router.post('/:id', async (req, res) => {
  try {
    const {projet, update, completed, reported, etatrisque} = req.body;
    await db.query('INSERT INTO report (projet, update, completed, reported, etatrisque, datereport) ' +
      'VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)',
      [projet, update, completed, reported, etatrisque]);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({error: err.message});
    console.error(err.stack);
  }
});

module.exports = router;