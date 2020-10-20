const Router = require('express-promise-router');
const stripe = require("stripe")('sk_test_51HYwKuBamjKTPrkZlKMy5A0i2wAlzV06ed66OtOWhWRZ4Ur0dn5tqtOBwejNWID9x4YhnuB5giY6lJtCZImZcSVm00adl8wtHj');
const cors = require("cors");
const db = require('../db');
const bodyParser = require("body-parser");

const router = new Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());


router.post('/', async (req, res) => {
    const stripeToken = req.body.stripeToken;
    try {
        const charge = await stripe.charges.create({
            amount: req.body.amount,
            currency: "cad",
            description: "ProjetGo "+req.body.description,
            source: stripeToken
        });
        res.json(charge);
    } catch (error) {
        if(error.code === "card_declined"){
            res.status(500).send({ error: error.code });
        } else {
            console.log("Erreur lors de contact API");
            res.status(501).send({ error: error.code });
        }
    };
})

//Creation d'un don
router.post('/don', async (req, res) => {
    const {fundraising,datedon,montant,typepaiement,nom,prenom,email,phone,adresse} = req.body;
    console.log(req.body);
    try {
        const donInfo = await db.query("INSERT INTO don (fundraising,datedon,montant,typepaiement,nom,prenom,email,phone,adresse) VALUES($1, $2 ,$3 ,$4 ,$5 ,$6 ,$7, $8, $9) RETURNING *",
            [fundraising,datedon,montant,typepaiement,nom,prenom,email,phone,adresse]);

        res.json(donInfo.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: error.message});
    }

    try {
        const updateMontant = await db.query("UPDATE project SET totalFondsColl = totalFondsColl + $1 WHERE code IN(SELECT projet FROM fundraising WHERE fundraising_id = $2)",
            [montant, fundraising]);
    } catch(error) {
        console.log(error.message);
        res.status(502).json({error: error.message});
    }

});

module.exports = router;