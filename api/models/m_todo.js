var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  title:  {
    type : String,
    required : [true, 'title is required! please fill it!']
  },
  description: {
    type : String,
    required : [true, 'description is required! please fill it!']
  },
  createdAt: {
    type : Date
  },
  updatedAt: {
    type : Date
  },
  completed: {
    type : Boolean,
    require : [true, 'completed is required! please fill it!']
  },
  creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

var todo = mongoose.model('Todo', todoSchema);

module.exports = todo
