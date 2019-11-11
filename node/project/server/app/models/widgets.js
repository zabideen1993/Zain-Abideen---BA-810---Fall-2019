var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var WidgetsSchema = new Schema({
    Foo: { type: String, required: true },
    Woo: { type: Number, default: 10 },
   });

module.exports = Mongoose.model('widgets', WidgetsSchema);