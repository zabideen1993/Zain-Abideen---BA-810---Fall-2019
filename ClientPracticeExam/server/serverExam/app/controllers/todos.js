
'use strict'
var express = require('express'),
    async = require('async'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Todo = mongoose.model('Todos');

module.exports = function (app, config) {
    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 

    router.route('/todos').get((req, res, next) => {
        logger.log('info', 'Get all todos');

        res.status(200).json({ message: 'Got all todos' });//remove after database stuff is added the got user with code that retrieve users from db 

    });

    router.route('/todos').post((req, res, next) => {
        logger.log('info', 'Create Todo');
        console.log(req.body);
        var todo = new Todo(req.body);
        todo.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    });

    router.route('/todos/:id').get((req, res, next) => {
        logger.log('info', 'Get todo %s', req.params.id);
        Todo.findById(req.params.id)
            .then(todo => {
                if (todo) {
                    res.status(200).json(todo);
                } else {
                    res.status(404).json({ message: "No todo found" });
                }
            })
            .catch(error => {
                return next(error);


            });
    });
    router.route('/todos/user/:id').get((req, res, next) => {
        logger.log('info', 'Get all users todos');
        var query=Todo.find({userId: req.params.id})
        .sort(req.query.order)
        .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No todo found" });
                }
            })
            .catch(error => {
                return next(error);


            });
    });
    router.route('/todos/:id').put((req, res, next) => {
        logger.log('info', 'Get todo %s', req.params.id);
        Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(todo => {
                res.status(200).json(todo);
            }).catch(eror => {
                return next(error);
            });

    });

    router.route('/todos/:id').delete((req, res, next) => {
        logger.log('info', 'Delete todo %s', req.params.id);
        Todo.remove({ _id: req.params.id })
            .then(todo => {
                res.status(200).json({ msg: "Todo Deleted" });
            })
            .catch(error => {
                return next(error);

            });
        });
    }
