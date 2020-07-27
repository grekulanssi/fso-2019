const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
content: String,
blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment