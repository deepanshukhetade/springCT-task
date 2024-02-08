const mongoose = require('mongoose')

let AllocatedCompany = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  companyId: { type: mongoose.Types.ObjectId, ref: "Company" },
},
  { timestamps: true }
)

module.exports = mongoose.model('AllocatedCompany', AllocatedCompany)