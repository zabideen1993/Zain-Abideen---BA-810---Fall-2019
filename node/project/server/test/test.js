//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose"),
User = require('../app/models/users');
Todo = require ('../app/models/todos');
Widget = require ('../app/models/widgets');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

it('it should GET the index.html file', (done) => {
    chai.request(server)
        .get('/index.html')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
});

it('it should return 404', (done) => {
    chai.request(server).get('/index2.html')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
});

describe('User', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });
    it('it should POST a user', (done) => {
        var user = {
            "fname": "Jane",
            "lname": "Doe",
            "email": "woo@hoo.com",
            "password": "pass"
        }
        chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('fname');
                res.body.fname.should.be.a('string');
                res.body.fname.should.equal('Jane');
                done();
            });
    });

    it('it should not POST a user without email field', (done) => {
        var user = {
            "fname": "Jane",
            "lname": "Doe",
            "password": "pass"
        }
        chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('it should GET all the users', (done) => {
        var user = new User({
            "fname": "Jane",
            "lname": "Doe",
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });
        user.save((err, user) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });
    it('it should GET a user by the given id', (done) => {
        var user = new User({
            "fname": "Jane",
            "lname": "Doe",
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });

        user.save((err, user) => {
            chai.request(server)
                .get('/api/users/' + user._id)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('fname');
                    res.body.should.have.property('lname');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('_id').eql(user._id.toString());
                    done();
                });
        });

    });

    it('it should UPDATE a user', (done) => {

        var user = new User({
            "fname": "Jane",
            "lname": "Doe",
            "email": "yoo@hoo.com",
            "password": "pass"
        });
        user.save((err, user) => {
            chai.request(server)
                .put('/api/users/' + user._id)
                .send({
                    "_id": user._id,
                    "fname": "Joey",
                    "lname": "Doe",
                    "email": "yoo@hoo.edu",
                    "password": "pass"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eql('yoo@hoo.edu');
                    res.body.should.have.property('fname').eql('Joey');
                    done();
                });
        });
    });

    it('it should DELETE a user given the id', (done) => {
        var user = new User({
            "fname": "Jane",
            "lname": "Doe",
            "email": "five@hoo.com",
            "password": "pass"
        });
        user.save((err, user) => {
            chai.request(server)
                .delete('/api/users/' + user.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

var USER_ID;


    describe('ToDo', () => {
        beforeEach((done) => {
            Todo.remove({}, (err) => {
                done();
            });
        });
        var user = new User({
            "fname": "Jane",
            "lname": "Doe",
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });
        user.save((err, user) => {
            USER_ID = user._id;
        });
    
        it('it should POST a todo', (done) => {
    
            var todo = {
                "userid": USER_ID,
                "todo": "This is my ToDo"
            }
    
            chai.request(server)
                .post('/api/todos')
                .send(todo)
                .end((err, res) => {
                    console.log(err)
                    res.should.have.status(201);
                    res.body.should.have.property('todo');
                    res.body.todo.should.be.a('string');
                    res.body.todo.should.equal('This is my ToDo');
                    done();
                });
        });
    }); 
/////////////////////////check/////////////

it('it should GET a users todo', (done) => {
    var todo = new Todo({
        "userid": USER_ID,
        "todo": "This is my ToDo"
    })
    todo.save((err, todo) => {
        chai.request(server)
            .get('/api/todos/user/' + USER_ID)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                //res.body.length.should.be.eql(2);
                done();
            });
    });
});

it('it should GET a todo', (done) => {
    var todo = new Todo({
        "userid": USER_ID,
        "todo": "This is my ToDo",
    })
    todo.save((err, todo) => {
        chai.request(server)
            .get('/api/todos/' + todo._id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('userid');
                res.body.should.have.property('todo');
                res.body.should.have.property('status');
                res.body.should.have.property('dateCreated');
                res.body.should.have.property('_id').eql(todo._id.toString());
                done();
            });
    });
});


it('it should UPDATE a todo', (done) => {

    var todo = new Todo({
        "userid": USER_ID,
        "todo": "This is my ToDo",
        "detail": "This is a status"
    })
    todo.save((err, todo) => {
        chai.request(server)
            .put('/api/todos/' + todo._id)
            .send({
                "_id": todo._id,
                "userid": USER_ID,
                "todo": "Get it done!",
                "detail": "I don't need a status",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('todo').eql('Get it done!');
                res.body.should.have.property('status').eql("Todo");
                done();
            });
    });
});

it('it should DELETE a todo given the id', (done) => {
    var todo = new Todo({
        "userid": USER_ID,
        "todo": "This is my ToDo",
        "description": "This is a description"
    })
    todo.save((err, todo) => {
        chai.request(server)
            .delete('/api/todos/' + todo.id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    /////////////////Widget test case
    describe('Widget', () => {
        beforeEach((done) => {
            Widget.remove({}, (err) => {
                done();
            });
        });
     ////////Get all widgets//
     it('it should GET all the widgets', (done) => {
        var widget = new Widget({
            "Foo": "Doe",
            "Woo": 11    
        });
        widget.save((err, widget) => {
            chai.request(server)
                .get('/api/widgets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });
        
     ////post////   
        it('it should POST a widget', (done) => {
            var widget = {
                "Foo": "Jane",
                "Woo": 10 
            }
            chai.request(server)
                .post('/api/widgets')
                .send(widget)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('Foo');
                    res.body.Foo.should.be.a('string');
                    res.body.Foo.should.equal('Jane');
                    done();
                });
        });
    
    });
});