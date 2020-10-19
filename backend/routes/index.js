const user = require('./user');
const project = require('./project');
const auth = require('./auth');
const report = require('./report');
const payment = require('./payment');


module.exports = app => {
    app.use('/auth', auth);
    app.use('/report', report);
    app.use('/user', user);
    app.use('/project', project);
    app.use('/payment', payment);
    // etc..
}
