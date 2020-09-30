const url = require('url')
const ResponseHelper = require('../Helpers/ResponseHelpers')
const dt = require('../DataLayer/dt_package')

// namas
const packages = {
  read: (req, res) => {
    dt.read_all_dt(function (items) {
      ResponseHelper.sendResponse(res, 200, items)
    })
  },
  read_by_id: (req, res) => {
    const queryObject = url.parse(req.url, true).query
    dt.read_by_id_dt(queryObject, function (items) {
      ResponseHelper.sendResponse(res, 200, items)
    })
  },

  delete_by_id: (req, res, next) => {
    if (!req.body) {
      ResponseHelper.sendResponse(res, 404, 'data not found')
    } else {
      const queryObject = url.parse(req.url, true).query
      dt.delete_dt(queryObject, function (result) {
        let respon = 'delete success'
        let code = 200
        if (result.n === 0) {
          respon = 'delete failed'
          code = 400
        }

        ResponseHelper.sendResponse(res, code, respon)
      })
    }
  },
  insert: (req, res, next) => {
    let data = req.body

    dt.insert_dt(data, function (items) {
      ResponseHelper.sendResponse(res, 200, items)
    })
  },
  update_patch: (req, res, next) => {
    const data = req.body
    const id = parseInt(url.parse(req.url, true).query.id)
    dt.update_dt(id, data, function () {
      let respon = 'update patch success..'
      ResponseHelper.sendResponse(res, 200, respon)
    })
  },
  update_put: (req, res, next) => {
    const data = req.body
    const id = parseInt(url.parse(req.url, true).query.id)
    dt.update_dt(id, data, function () {
      let respon = 'update put success..'
      ResponseHelper.sendResponse(res, 200, respon)
    })
  },
}
module.exports = packages
