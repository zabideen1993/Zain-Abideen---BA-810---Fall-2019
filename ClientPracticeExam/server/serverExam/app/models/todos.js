var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var statuses=['Todo','In process', 'Completed'];

var TodoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId},
    todo: { type: String, required: true },
    detail: { type: String },
    dateCreate: { type: Date, default: Date.now },
    dateDue: { type: Date, default: Date.now },
    status: { type: String, enum: statuses, default: 'Todo' }
});


module.exports = Mongoose.model('Todos', TodoSchema);

