const Router = require('express-promise-router');
const stripe = require("stripe")('sk_test_51HYwKuBamjKTPrkZlKMy5A0i2wAlzV06ed66OtOWhWRZ4Ur0dn5tqtOBwejNWID9x4YhnuB5giY6lJtCZImZcSVm00adl8wtHj');
const cors = require("cors");
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
        }
    };
})

module.exports = router;