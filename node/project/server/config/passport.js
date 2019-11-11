const passport = require('passport'),
    jwt = require('jsonwebtoken'),
    User = require('../app/models/users'),
    config = require('./config'),
    jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    localStrategy = require('passport-local');