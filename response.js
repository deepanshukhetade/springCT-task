const successResponse = (res, message, data) => {
  return res.status(200).json({
    status: "SUCCESS",
    code: 200,
    message: message,
    data: data ? data : {}
  })
}

const errorResponse = (res, message, error) => {
  return res.status(500).json({
    status: "FAILED",
    code: 500,
    message: message,
    error: error ? error : {}
  })
}

module.exports = { successResponse, errorResponse }