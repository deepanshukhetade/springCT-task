const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Company = require('../model/company')
const CompanyAllocated = require('../model/allocatedCompany')
let response = require('../response')

router.post('/company/add', async (req, res) => {
  try {
    let payload = req.body
    let result = await Company.create(payload)
    response.successResponse(res, 'Company added successfully', result)
  } catch (error) {
    response.errorResponse(res, error.message, error)
  }
})

router.delete('/company/delete/:id', async (req, res) => {
  try {
    let companyId = req.params.id
    let deletedResult = await Company.deleteOne({ _id: companyId })
    if (deletedResult) {
      await CompanyAllocated.deleteMany({ companyId: companyId })
    }
    response.successResponse(res, 'Company deleted successfully', {})
  } catch (error) {
    response.errorResponse(res, error.message, error)
  }
})

router.get('/company/details/:id', async (req, res) => {
  try {
    let companyId = req.params.id
    let result = await CompanyAllocated.find({ companyId: companyId })
      .populate('companyId')
      .populate('userId')
    let userData = []
    result.map(ele => {
      userData.push({
        _id: ele.userId._id,
        name: ele.userId.name,
        email: ele.userId.email,
        phone: ele.userId.phone
      })
    })
    let respObj = {
      _id: result[0].companyId._id,
      name: result[0].companyId.name,
      city: result[0].companyId.email,
      userData: userData
    }
    response.successResponse(res, 'Company fetched successfully with user details', respObj)
  } catch (error) {
    response.errorResponse(res, error.message, error)
  }
})


module.exports = router