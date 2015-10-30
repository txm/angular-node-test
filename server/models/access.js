var mongoose = require('mongoose')
 
module.exports = mongoose.model('Access',{
  ip: String,
  datetime: String, // TODO can this be timestamp or simply double?
})
