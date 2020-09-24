import express from 'express';
import mountRoutes from './routes';

/* Le fichier '.env' n'est pas inclus dans le repo, puisqu'il contient
*  les infos relative a la connection de la db. */
const app = express();
mountRoutes(app);

// How to listen to incoming
app.listen(3000);
