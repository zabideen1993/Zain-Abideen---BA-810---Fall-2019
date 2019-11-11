'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Widget = mongoose.model('widgets');

module.exports = function (app, config) {
    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 
    router.route('/widgets').get((req, res, next) => {
        logger.log('info', 'Get all widgets');
        var query = Widget.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No Widgets" });
                }
            })
            .catch(err => {
                return next(err);
            });
           
    }); 
    router.route('/widgets').post((req, res, next) => {
        logger.log('info', 'Create Widget');
    
        var widget = new Widget(req.body);
        widget.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch((err) => {
                return next(err);
            });
      
    });
};