
'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
module.exports = function (app, config) {
    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 
    router.route('/todos').get((req, res, next) => {
        logger.log('info', 'Get all users');

        res.status(200).json({ message: 'Got all users' });//remove after database stuff is added the got user with code that retrieve users from db 

    });
    router.route('/todos').post((req, res, next) => {
        logger.log('info', 'Create user');
        res.status(201).json({ message: 'Created user' });
    });

    // router.route('/users/login').post((req, res, next) => {
    //     logger.log('info', '%s logging in', req.body.email);
    //     var email = req.body.email
    //     var password = req.body.password;

    //     var obj = { 'email': email, 'password': password };
    //     res.status(201).json(obj);
    // });


    router.route('/todos/:id').get((req, res, next) => {
        logger.log('info', 'Get user %s', req.params.id);

        res.status(200).json({ id: req.params.id });
    });
    router.route('/users/:id').put((req, res, next) => {
        logger.log('info', 'Get user %s', req.params.id);

        res.status(200).json({ id: req.params.id });

    });

    router.route('/users/:id').delete((req, res, next) => {
        logger.log('info', 'Get user %s', req.params.id);

        res.status(200).json({ id: req.params.id });
    });



};