const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../model/user')
const CompanyAllocated = require('../model/allocatedCompany')
let response = require('../response')

router.post('/user/add', async (req, res) => {
  try {
    let payload = req.body
    let result = await User.create(payload)
    response.successResponse(res, 'User added successfully', result)
  } catch (error) {
    response.errorResponse(res, error.message, error)
  }
})

router.post('/user/add/companies', async (req, res) => {
  try {
    let payload = req.body
    let result = await CompanyAllocated.create(payload)
    response.successResponse(res, 'User added successfully', result)
  } catch (error) {
    response.errorResponse(res, error.message, error)
  }
})

router.get('/user/getCompanies/:id', async (req, res) => {
  try {
    let userId = req.params.id
    let result = await CompanyAllocated.find({ userId: userId })
      .populate('companyId')
      .populate('userId')
    let companyData = []
    result.map(company => { companyData.push(company.companyId.name) })
    let respObj = {
      _id: result[0].userId._id,
      name: result[0].userId.name,
      email: result[0].userId.email,
      phone: result[0].userId.phone,
      companyData: companyData
    }
    response.successResponse(res, 'User data fetched successfully with compay details', respObj)
  } catch (error) {
    response.errorResponse(res, error.message, error)
  }
})

module.exports = router