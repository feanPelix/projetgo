import users from './users';
import projects from './projects';
import auth from './auth';

module.exports = app => {
    app.use('/users', users);
    app.use('/projects', projects);
    app.use('/auth', auth);
    // etc..
}