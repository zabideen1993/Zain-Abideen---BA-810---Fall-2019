var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var widgetSchema = new Schema({
    foo: { type: String, required: true },
    woo: { type: Number, default: 10 }
});

module.exports = Mongoose.model('Widget', widgetSchema);
