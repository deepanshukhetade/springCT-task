const mongoose = require('mongoose')

let Company = new mongoose.Schema({
  name: { type: String },
  city: { type: String },
  userIds: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
},
  { timestamps: true }
)

module.exports = mongoose.model('Company', Company)