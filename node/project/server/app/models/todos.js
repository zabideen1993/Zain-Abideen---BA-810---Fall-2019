var Mongoose = require('mongoose');
var status = ['Todo','InProcess','Completed'];  
var Schema = Mongoose.Schema;

var TodosSchema = new Schema({
    userid: { type: Schema.Types.ObjectId, required: true },
    todo: { type: String, required: true },
    detail: { type: String },
    dateCreated: { type: Date, default: Date.now },
    dateDue: { type: Date, default: Date.now },
    status: { type: String, Enum: ['Todo', 'In Process', 'Completed'], default: 'Todo' },// ENUM validation
    fileName: { type: String, originalName: String }
});

module.exports = Mongoose.model('todos', TodosSchema);