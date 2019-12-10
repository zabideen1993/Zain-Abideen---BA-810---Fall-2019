'use strict';
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Widget = mongoose.model('Widget');

module.exports = function(app, config) {
    app.use('/api', router);
    router.route('/widgets').get((req, res, next) => {
        logger.log('info', 'Get All Widgets');
        const query = Widget.find()
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: 'No Widgets found' });
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/widgets').post((req, res, next) => {
        logger.log('info', 'Create a Widget');
        const widget = new Widget(req.body);
        widget
            .save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/widgets/:id').get((req, res, next) => {
        const { id } = req.params;
        logger.log('info', 'Getting a Widget with id: ' + id);

        Widget.findById(id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/widgets/:id').put((req, res, next) => {
        const { id } = req.params;
        logger.log('info', 'Getting a Widget with id: ' + id);

        Widget.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            multi: false
        })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.route('/widgets/:id').delete((req, res, next) => {
        const { id } = req.params;
        logger.log('info', 'Delete a Widget with id: ' + id);

        Widget.remove({ _id: id })
            .then(result => {
                res.status(200).json({ msg: 'Widget Deleted' });
            })
            .catch(err => {
                return next(err);
            });
    });
};
